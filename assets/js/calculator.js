/* ============================================
   配比优化计算器脚本 - calculator.js
   ============================================
   【功能说明】
   本文件负责交互模型中心的功能实现：
   1. 渲染输入参数界面（滑块+数字输入）
   2. 执行配比优化计算
   3. 显示计算结果
   4. 展示计算公式和评价标准
   
   【数据来源】
   读取data/experiment.js中的：
   - inputParams: 输入参数配置
   - calculationFormula: 计算公式函数
   - evaluationCriteria: 评价标准
   - parameterDescriptions: 参数说明
   ============================================ */

// 存储当前输入值
let calculatorInputs = {};

// ==========================================
// 1. 渲染输入界面
// ==========================================

/**
 * 渲染计算器输入参数界面
 * 根据data/experiment.js中的inputParams配置生成输入控件
 */
function renderCalculatorInputs() {
    if (typeof EXPERIMENT_DATA === 'undefined') {
        console.warn('EXPERIMENT_DATA未加载');
        return;
    }
    
    const container = document.getElementById('calculator-inputs');
    if (!container) return;
    
    const params = EXPERIMENT_DATA.inputParams;
    if (!params || params.length === 0) {
        return; // 保持占位符
    }
    
    // 初始化输入值
    params.forEach(param => {
        calculatorInputs[param.id] = param.default;
    });
    
    let html = '';
    params.forEach(param => {
        html += `
            <div class="input-group">
                <div class="flex justify-between items-center mb-2">
                    <label class="font-medium text-gray-700">${param.name}</label>
                    <span class="text-sm text-primary font-bold">
                        <span id="value-${param.id}">${param.default}</span> ${param.unit}
                    </span>
                </div>
                <div class="flex items-center gap-4">
                    <input type="range" 
                           id="range-${param.id}" 
                           min="${param.min}" 
                           max="${param.max}" 
                           step="${param.step}" 
                           value="${param.default}"
                           class="flex-1"
                           oninput="updateInputValue('${param.id}', this.value)">
                    <input type="number" 
                           id="number-${param.id}" 
                           min="${param.min}" 
                           max="${param.max}" 
                           step="${param.step}" 
                           value="${param.default}"
                           class="w-20 px-2 py-1 border border-gray-300 rounded text-center"
                           onchange="updateInputValue('${param.id}', this.value)">
                </div>
                <p class="text-xs text-gray-500 mt-1">${param.description}</p>
            </div>
        `;
    });
    
    container.innerHTML = html;
    
    // 启用计算按钮
    const calcBtn = document.getElementById('calculate-btn');
    if (calcBtn) {
        calcBtn.disabled = false;
        calcBtn.addEventListener('click', performCalculation);
    }
    
    // 渲染参数说明
    renderParameterDescriptions();
    
    // 渲染评价标准
    renderEvaluationCriteria();
}

/**
 * 更新输入值（滑块和数字输入框同步）
 */
function updateInputValue(paramId, value) {
    const numValue = parseFloat(value);
    calculatorInputs[paramId] = numValue;
    
    // 更新显示值
    const valueEl = document.getElementById(`value-${paramId}`);
    if (valueEl) {
        valueEl.textContent = numValue;
    }
    
    // 同步滑块
    const rangeEl = document.getElementById(`range-${paramId}`);
    if (rangeEl) {
        rangeEl.value = numValue;
    }
    
    // 同步数字输入框
    const numberEl = document.getElementById(`number-${paramId}`);
    if (numberEl) {
        numberEl.value = numValue;
    }
}

// ==========================================
// 2. 执行计算
// ==========================================

/**
 * 执行配比优化计算
 */
function performCalculation() {
    if (typeof EXPERIMENT_DATA === 'undefined') {
        alert('计算数据未加载');
        return;
    }
    
    const formula = EXPERIMENT_DATA.calculationFormula;
    if (!formula || typeof formula !== 'function') {
        alert('计算公式未配置');
        return;
    }
    
    try {
        // 执行计算
        const results = formula(calculatorInputs);
        
        // 渲染结果
        renderCalculationResults(results);
        
    } catch (error) {
        console.error('计算出错:', error);
        alert('计算过程中出现错误，请检查输入参数');
    }
}

/**
 * 渲染计算结果
 */
function renderCalculationResults(results) {
    const container = document.getElementById('calculator-results');
    if (!container) return;
    
    // 获取评价标准
    const criteria = EXPERIMENT_DATA.evaluationCriteria || [];
    const gradeInfo = criteria.find(c => c.grade === results.grade) || {};
    
    let html = `
        <div class="grid grid-cols-2 gap-4">
            <!-- 预测强度 -->
            <div class="result-card">
                <div class="result-value" style="color: ${gradeInfo.color || '#165DFF'}">${results.strength}</div>
                <div class="result-label">预测强度 (MPa)</div>
            </div>
            
            <!-- 性能等级 -->
            <div class="result-card">
                <div class="result-value" style="color: ${gradeInfo.color || '#165DFF'}">${results.grade}</div>
                <div class="result-label">性能等级</div>
            </div>
            
            <!-- 材料成本 -->
            <div class="result-card">
                <div class="result-value">${results.cost}</div>
                <div class="result-label">材料成本 (元/m³)</div>
            </div>
            
            <!-- 充填体密度 -->
            <div class="result-card">
                <div class="result-value">${results.density}</div>
                <div class="result-label">充填体密度 (kg/m³)</div>
            </div>
            
            <!-- 坍落度 -->
            <div class="result-card">
                <div class="result-value">${results.slump || '-'}</div>
                <div class="result-label">坍落度 (cm)</div>
            </div>
            
            <!-- 泌水率 -->
            <div class="result-card">
                <div class="result-value">${results.bleeding || '-'}</div>
                <div class="result-label">泌水率 (%)</div>
            </div>
        </div>
        
        <!-- 等级说明 -->
        <div class="mt-6 p-4 rounded-lg" style="background-color: ${gradeInfo.color || '#165DFF'}15; border-left: 4px solid ${gradeInfo.color || '#165DFF'}">
            <h4 class="font-medium mb-1" style="color: ${gradeInfo.color || '#165DFF'}">
                ${results.grade}级 - ${gradeInfo.description || ''}
            </h4>
            <p class="text-sm text-gray-600">
                该配比方案${results.grade === 'D' ? '不' : ''}满足充填要求
            </p>
        </div>
    `;
    
    container.innerHTML = html;
}

// ==========================================
// 3. 参数说明和评价标准
// ==========================================

/**
 * 渲染参数说明
 */
function renderParameterDescriptions() {
    const container = document.querySelector('#calculator .bg-blue-50 p');
    if (!container) return;
    
    const descriptions = EXPERIMENT_DATA.parameterDescriptions;
    if (!descriptions) return;
    
    let html = '<ul class="space-y-2 text-sm">';
    for (const [key, desc] of Object.entries(descriptions)) {
        const param = EXPERIMENT_DATA.inputParams.find(p => p.id === key);
        if (param) {
            html += `<li><span class="font-medium">${param.name}：</span>${desc}</li>`;
        }
    }
    html += '</ul>';
    
    container.innerHTML = html;
}

/**
 * 渲染评价标准
 */
function renderEvaluationCriteria() {
    const container = document.querySelector('#calculator .bg-green-50 p');
    if (!container) return;
    
    const criteria = EXPERIMENT_DATA.evaluationCriteria;
    if (!criteria || criteria.length === 0) return;
    
    let html = '<ul class="space-y-2 text-sm">';
    criteria.forEach(c => {
        html += `
            <li class="flex items-center">
                <span class="w-6 h-6 rounded-full flex items-center justify-center text-white text-xs mr-2" 
                      style="background-color: ${c.color}">${c.grade}</span>
                <span>${c.minStrength}-${c.maxStrength === 999 ? '∞' : c.maxStrength}MPa：${c.description}</span>
            </li>
        `;
    });
    html += '</ul>';
    
    container.innerHTML = html;
    
    // 同时渲染公式说明区的评价标准
    renderFormulaDisplay();
}

/**
 * 渲染计算公式说明
 */
function renderFormulaDisplay() {
    const container = document.getElementById('formula-display');
    if (!container) return;
    
    // 检查是否已经配置公式
    const formula = EXPERIMENT_DATA.calculationFormula;
    if (!formula) return;
    
    // 显示公式说明
    let html = `
        <div class="space-y-4">
            <div class="bg-white p-4 rounded-lg">
                <h4 class="font-medium text-gray-900 mb-2">计算公式说明</h4>
                <p class="text-sm text-gray-600">
                    本计算器基于实验数据建立的回归模型，通过输入配比参数预测充填体性能。
                    计算公式已根据您的实验数据进行拟合，确保预测结果的准确性。
                </p>
            </div>
            
            <div class="bg-white p-4 rounded-lg">
                <h4 class="font-medium text-gray-900 mb-2">输入参数</h4>
                <ul class="text-sm text-gray-600 space-y-1">
    `;
    
    EXPERIMENT_DATA.inputParams.forEach(param => {
        html += `<li>• ${param.name}：${param.min}~${param.max}${param.unit}</li>`;
    });
    
    html += `
                </ul>
            </div>
            
            <div class="bg-white p-4 rounded-lg">
                <h4 class="font-medium text-gray-900 mb-2">输出指标</h4>
                <ul class="text-sm text-gray-600 space-y-1">
                    <li>• 预测强度：充填体抗压强度预测值（MPa）</li>
                    <li>• 性能等级：根据强度划分的A/B/C/D等级</li>
                    <li>• 材料成本：每立方米充填材料成本（元/m³）</li>
                    <li>• 充填体密度：硬化后充填体密度（kg/m³）</li>
                </ul>
            </div>
        </div>
    `;
    
    container.innerHTML = html;
}

// ==========================================
// 4. 初始化
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // 延迟初始化，确保数据文件已加载
    setTimeout(() => {
        renderCalculatorInputs();
    }, 100);
});
