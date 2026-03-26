/* ============================================
   虚拟仿真实验脚本 - virtual-experiment.js
   ============================================
   【功能说明】
   本文件负责虚拟仿真实验的交互逻辑和动画控制
   包含6个步骤的完整流程控制
   
   【修改说明】
   如需调整实验步骤或内容，请修改以下配置对象
   ============================================ */

// ==========================================
// 1. 实验步骤配置（可修改区域）
// ==========================================

const EXPERIMENT_STEPS = [
    {
        id: 1,
        title: '配料称量',
        description: '按照设计配比准确称量各组分材料。本实验采用铁尾矿基胶结充填材料，配比为：铁尾矿450g、矿渣粉100g、脱硫石膏50g、水200g。',
        principle: `
            <p><strong>充填体配比设计依据：</strong></p>
            <p>配比设计需综合考虑充填体强度要求、输送性能和经济效益。铁尾矿作为主要骨料，其掺量直接影响充填体强度和成本；矿渣粉和脱硫石膏作为胶凝材料，通过协同激发效应提高充填体强度。</p>
            <p><strong>各组分作用：</strong></p>
            <ul class="list-disc list-inside space-y-1 ml-2">
                <li><strong>铁尾矿：</strong>主要骨料，提供充填体骨架结构，占比约60-75%</li>
                <li><strong>矿渣粉：</strong>潜在水硬性材料，提供后期强度</li>
                <li><strong>脱硫石膏：</strong>激发剂，促进水化反应，提高早期强度</li>
                <li><strong>水：</strong>水化反应介质，影响流动性和强度发展</li>
            </ul>
        `,
        tip: '称量精度要求：固体材料精确至±1g，水精确至±0.5g。称量顺序建议：先固体后液体，避免水分损失。',
        standard: '《胶结充填体性能测试规范》(YS/T 3014-2013)',
        duration: 3000 // 动画持续时间（毫秒）
    },
    {
        id: 2,
        title: '搅拌混合',
        description: '将称量好的各组分倒入搅拌机中，按标准程序进行搅拌。先干混30秒，再加入水湿混2分钟，直至料浆均匀。',
        principle: `
            <p><strong>搅拌工艺原理：</strong></p>
            <p>搅拌的目的是使各组分均匀分散，形成稳定的料浆体系。干混阶段使固体颗粒初步均匀分布；湿混阶段通过水的润滑作用，使颗粒进一步分散，形成具有流动性的料浆。</p>
            <p><strong>料浆浓度对性能的影响：</strong></p>
            <ul class="list-disc list-inside space-y-1 ml-2">
                <li><strong>浓度过高（>82%）：</strong>流动性差，输送困难，易产生离析</li>
                <li><strong>浓度适中（75-80%）：</strong>流动性好，强度发展正常</li>
                <li><strong>浓度过低（<72%）：</strong>泌水严重，强度降低，收缩增大</li>
            </ul>
            <p><strong>搅拌时间控制：</strong>搅拌时间过短会导致混合不均；过长会引入过多气泡，影响强度。</p>
        `,
        tip: '搅拌转速控制在30-60rpm，搅拌时间2-3分钟。注意观察料浆状态，应呈均匀膏状，无结块、无气泡。',
        standard: '《水泥胶砂强度检验方法》(GB/T 17671-2021)',
        duration: 4000
    },
    {
        id: 3,
        title: '装模振捣',
        description: '将搅拌好的料浆分两层装入40×40×160mm三联试模中，每层装模后振捣30秒，排除气泡，确保密实。',
        principle: `
            <p><strong>试模规格说明：</strong></p>
            <p>采用40×40×160mm标准三联试模，可同时成型3个试样，用于测定抗折和抗压强度。试模材质为铸铁或钢，内壁光滑，尺寸精度±0.1mm。</p>
            <p><strong>振捣的作用：</strong></p>
            <ul class="list-disc list-inside space-y-1 ml-2">
                <li><strong>排气：</strong>排除料浆中的气泡，减少孔隙率</li>
                <li><strong>密实：</strong>使颗粒紧密堆积，提高密实度</li>
                <li><strong>均匀：</strong>促进料浆在模内均匀分布</li>
            </ul>
            <p><strong>振捣注意事项：</strong>振捣时间不足会导致孔隙率高；过长会引起颗粒离析，影响强度均匀性。</p>
        `,
        tip: '装模时分两层装入，每层振捣30秒。振捣频率50-60Hz，振幅0.5-1.0mm。装模后刮平表面，标记试样编号。',
        standard: '《胶结充填体性能测试规范》(YS/T 3014-2013)',
        duration: 3500
    },
    {
        id: 4,
        title: '脱模静置',
        description: '试样在室温（20±2°C）下静置24小时后脱模。脱模时应小心操作，避免损伤试样棱角。',
        principle: `
            <p><strong>静置养护的作用：</strong></p>
            <p>静置期间，胶凝材料开始水化反应，形成初步强度。适当的温湿度条件有利于水化产物生成，提高早期强度。</p>
            <p><strong>脱模时间控制：</strong></p>
            <ul class="list-disc list-inside space-y-1 ml-2">
                <li><strong>脱模过早：</strong>强度不足，易损伤试样</li>
                <li><strong>脱模过晚：</strong>试样收缩，与模具粘连</li>
                <li><strong>适宜时间：</strong>24小时左右，视温度而定</li>
            </ul>
            <p><strong>环境要求：</strong>温度20±2°C，相对湿度≥50%，避免阳光直射和风吹。</p>
        `,
        tip: '脱模时先松开模具螺丝，轻轻敲击模具侧面，使试样与模具分离。取出试样后检查外观，有缺陷的试样应废弃。',
        standard: '《水泥胶砂强度检验方法》(GB/T 17671-2021)',
        duration: 3000
    },
    {
        id: 5,
        title: '标准养护',
        description: '将脱模后的试样放入标准养护箱中，在温度20±2°C、相对湿度≥95%的条件下养护至规定龄期（3d、7d、28d）。',
        principle: `
            <p><strong>标准养护条件：</strong></p>
            <p>标准养护温度20±2°C、相对湿度≥95%，是水泥水化的最佳条件。在此条件下，水泥水化反应充分进行，强度发展规律稳定。</p>
            <p><strong>不同龄期水化特点：</strong></p>
            <ul class="list-disc list-inside space-y-1 ml-2">
                <li><strong>3天（加速期）：</strong>水化反应迅速，C3S大量水化，强度快速发展</li>
                <li><strong>7天（稳定期）：</strong>水化反应趋于平稳，强度继续增长</li>
                <li><strong>28天（成熟期）：</strong>水化基本完成，强度趋于稳定，作为设计强度依据</li>
            </ul>
            <p><strong>养护的重要性：</strong>养护条件直接影响水化程度和最终强度。养护不当会导致强度降低、耐久性变差。</p>
        `,
        tip: '试样应水平放置在养护架上，间距不小于20mm，避免相互接触。养护水应使用洁净的自来水，定期更换。',
        standard: '《胶结充填体性能测试规范》(YS/T 3014-2013)',
        duration: 2000
    },
    {
        id: 6,
        title: '抗压强度测试',
        description: '使用压力试验机对养护至规定龄期的试样进行抗压强度测试。加载速率控制在2.4kN/s，记录破坏荷载并计算抗压强度。',
        principle: `
            <p><strong>抗压强度测试原理：</strong></p>
            <p>通过压力试验机对试样施加轴向压力，直至试样破坏。根据破坏荷载和试样受压面积计算抗压强度。</p>
            <p><strong>强度计算公式：</strong></p>
            <div class="bg-gray-100 p-2 rounded my-2 font-mono text-sm">
                R = F / A<br>
                其中：R-抗压强度(MPa)，F-破坏荷载(N)，A-受压面积(mm²)
            </div>
            <p><strong>强度指标对井下充填的意义：</strong></p>
            <ul class="list-disc list-inside space-y-1 ml-2">
                <li><strong>支撑作用：</strong>充填体需承受上覆岩层压力，强度不足会导致垮塌</li>
                <li><strong>稳定性：</strong>足够的强度保证充填体长期稳定，维护采场安全</li>
                <li><strong>设计依据：</strong>强度数据是充填配比设计和工艺优化的重要依据</li>
            </ul>
        `,
        tip: '测试前测量试样尺寸，精确至0.1mm。加载应连续均匀，避免冲击。试样破坏后记录破坏形态，分析破坏原因。',
        standard: '《水泥胶砂强度检验方法》(GB/T 17671-2021)',
        duration: 5000
    }
];

// ==========================================
// 2. 实验状态管理
// ==========================================

let currentStep = 1;
let isAnimating = false;
let animationTimer = null;

// ==========================================
// 3. 初始化函数
// ==========================================

document.addEventListener('DOMContentLoaded', function() {
    initExperiment();
    bindEvents();
});

function initExperiment() {
    updateStepDisplay();
    updateProgressBar();
    updateStepIndicators();
}

function bindEvents() {
    // 开始实验按钮
    document.getElementById('btn-start').addEventListener('click', startExperiment);
    
    // 上一步按钮
    document.getElementById('btn-prev').addEventListener('click', goToPrevStep);
    
    // 下一步按钮
    document.getElementById('btn-next').addEventListener('click', goToNextStep);
    
    // 重置按钮
    document.getElementById('btn-reset').addEventListener('click', resetExperiment);
    
    // 龄期选择按钮
    document.querySelectorAll('.age-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            selectAge(this.dataset.age);
        });
    });
}

// ==========================================
// 4. 步骤控制函数
// ==========================================

function startExperiment() {
    document.getElementById('btn-start').classList.add('hidden');
    document.getElementById('btn-next').classList.remove('hidden');
    runStepAnimation(currentStep);
}

function goToNextStep() {
    if (isAnimating || currentStep >= 6) return;
    
    currentStep++;
    updateStepDisplay();
    updateProgressBar();
    updateStepIndicators();
    updateButtons();
    runStepAnimation(currentStep);
}

function goToPrevStep() {
    if (isAnimating || currentStep <= 1) return;
    
    currentStep--;
    updateStepDisplay();
    updateProgressBar();
    updateStepIndicators();
    updateButtons();
    runStepAnimation(currentStep);
}

function resetExperiment() {
    // 清除动画定时器
    if (animationTimer) {
        clearTimeout(animationTimer);
    }
    
    // 重置状态
    currentStep = 1;
    isAnimating = false;
    
    // 重置UI
    document.getElementById('btn-start').classList.remove('hidden');
    document.getElementById('btn-next').classList.add('hidden');
    document.getElementById('completion-modal').classList.add('hidden');
    
    updateStepDisplay();
    updateProgressBar();
    updateStepIndicators();
    updateButtons();
    
    // 隐藏所有动画
    document.querySelectorAll('.step-animation').forEach(el => {
        el.classList.remove('active');
    });
    
    // 显示第一步动画
    document.getElementById('step1-animation').classList.add('active');
}

// ==========================================
// 5. UI更新函数
// ==========================================

function updateStepDisplay() {
    const step = EXPERIMENT_STEPS[currentStep - 1];
    
    // 更新步骤编号和标题
    document.getElementById('step-number').textContent = step.id;
    document.getElementById('step-title').textContent = step.title;
    
    // 更新步骤描述
    document.getElementById('step-description').innerHTML = `<p>${step.description}</p>`;
    
    // 更新原理讲解
    document.getElementById('principle-content').innerHTML = step.principle;
    
    // 更新操作提示
    document.getElementById('operation-tip').textContent = step.tip;
    
    // 更新参考标准
    document.getElementById('standard-reference').textContent = step.standard;
    
    // 更新进度文本
    document.getElementById('progress-text').textContent = `步骤 ${currentStep} / 6`;
}

function updateProgressBar() {
    const progress = (currentStep / 6) * 100;
    document.getElementById('progress-bar').style.width = progress + '%';
}

function updateStepIndicators() {
    document.querySelectorAll('.step-indicator').forEach((indicator, index) => {
        const stepNum = index + 1;
        const div = indicator.querySelector('div');
        const span = indicator.querySelector('span');
        
        indicator.classList.remove('active', 'completed');
        
        if (stepNum === currentStep) {
            indicator.classList.add('active');
            div.className = 'w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold';
            span.className = 'text-xs mt-1 block text-center text-primary font-semibold';
        } else if (stepNum < currentStep) {
            indicator.classList.add('completed');
            div.className = 'w-8 h-8 rounded-full bg-green-500 text-white flex items-center justify-center text-sm font-bold';
            span.className = 'text-xs mt-1 block text-center text-green-600';
        } else {
            div.className = 'w-8 h-8 rounded-full bg-gray-300 text-gray-600 flex items-center justify-center text-sm font-bold';
            span.className = 'text-xs mt-1 block text-center text-gray-500';
        }
    });
}

function updateButtons() {
    const prevBtn = document.getElementById('btn-prev');
    const nextBtn = document.getElementById('btn-next');
    
    // 更新上一步按钮
    prevBtn.disabled = currentStep === 1;
    
    // 更新下一步按钮
    if (currentStep === 6) {
        nextBtn.innerHTML = `
            完成实验
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"/>
            </svg>
        `;
        nextBtn.onclick = completeExperiment;
    } else {
        nextBtn.innerHTML = `
            下一步
            <svg class="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
            </svg>
        `;
        nextBtn.onclick = goToNextStep;
    }
}

// ==========================================
// 6. 动画控制函数
// ==========================================

function runStepAnimation(stepNum) {
    // 隐藏所有动画
    document.querySelectorAll('.step-animation').forEach(el => {
        el.classList.remove('active');
    });
    
    // 显示当前步骤动画
    const animationEl = document.getElementById(`step${stepNum}-animation`);
    if (animationEl) {
        animationEl.classList.add('active');
    }
    
    // 执行具体动画
    isAnimating = true;
    
    switch(stepNum) {
        case 1:
            runWeighingAnimation();
            break;
        case 2:
            runMixingAnimation();
            break;
        case 3:
            runMoldingAnimation();
            break;
        case 4:
            runDemoldAnimation();
            break;
        case 5:
            runCuringAnimation();
            break;
        case 6:
            runTestingAnimation();
            break;
    }
}

// 步骤1：配料称量动画
function runWeighingAnimation() {
    const materials = ['tailings', 'slag', 'gypsum', 'water'];
    const weights = [450, 100, 50, 200];
    const display = document.querySelector('.scale-display');
    
    let currentMaterial = 0;
    
    function weighNext() {
        if (currentMaterial >= materials.length) {
            isAnimating = false;
            return;
        }
        
        const material = materials[currentMaterial];
        const weight = weights[currentMaterial];
        const jar = document.querySelector(`[data-material="${material}"] .material-content`);
        
        // 显示称量动画
        if (jar) {
            jar.style.height = '80%';
        }
        
        // 更新显示屏
        let currentWeight = 0;
        const increment = weight / 20;
        const timer = setInterval(() => {
            currentWeight += increment;
            if (currentWeight >= weight) {
                currentWeight = weight;
                clearInterval(timer);
                
                // 重置并称量下一个
                setTimeout(() => {
                    if (jar) jar.style.height = '0';
                    display.textContent = '0.00 g';
                    currentMaterial++;
                    setTimeout(weighNext, 500);
                }, 500);
            }
            display.textContent = currentWeight.toFixed(2) + ' g';
        }, 50);
    }
    
    weighNext();
}

// 步骤2：搅拌混合动画
function runMixingAnimation() {
    const blade = document.getElementById('mixer-blade');
    const motor = document.getElementById('motor-indicator');
    const mixture = document.getElementById('mixture-content');
    const status = document.getElementById('mixing-status');
    const timer = status.querySelector('.timer');
    const mixTimeEl = document.getElementById('mix-time');
    
    // 启动动画
    blade.classList.add('active');
    motor.classList.add('active');
    mixture.classList.add('active');
    status.classList.add('active');
    
    // 计时器
    let seconds = 0;
    const timerInterval = setInterval(() => {
        seconds++;
        const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
        const secs = (seconds % 60).toString().padStart(2, '0');
        timer.textContent = `${mins}:${secs}`;
        mixTimeEl.textContent = seconds + 's';
        
        if (seconds >= 12) {
            clearInterval(timerInterval);
            
            // 停止动画
            setTimeout(() => {
                blade.classList.remove('active');
                motor.classList.remove('active');
                status.classList.remove('active');
                isAnimating = false;
            }, 500);
        }
    }, 100);
}

// 步骤3：装模振捣动画
function runMoldingAnimation() {
    const molds = document.querySelectorAll('.slurry-level');
    const vibTable = document.getElementById('vibration-table');
    const vibWaves = document.getElementById('vibration-waves');
    const pouring = document.getElementById('pouring-action');
    const vibTimeEl = document.getElementById('vib-time');
    
    let currentMold = 0;
    
    function fillAndVibrate() {
        if (currentMold >= molds.length) {
            isAnimating = false;
            return;
        }
        
        // 浇筑动画
        pouring.classList.add('active');
        
        setTimeout(() => {
            // 填充模具
            molds[currentMold].classList.add('filled');
            pouring.classList.remove('active');
            
            // 振捣动画
            setTimeout(() => {
                vibTable.classList.add('active');
                vibWaves.classList.add('active');
                
                let vibTime = 0;
                const vibTimer = setInterval(() => {
                    vibTime++;
                    vibTimeEl.textContent = vibTime + 's';
                    
                    if (vibTime >= 3) {
                        clearInterval(vibTimer);
                        vibTable.classList.remove('active');
                        vibWaves.classList.remove('active');
                        vibTimeEl.textContent = '0s';
                        
                        currentMold++;
                        setTimeout(fillAndVibrate, 500);
                    }
                }, 1000);
            }, 500);
        }, 1000);
    }
    
    fillAndVibrate();
}

// 步骤4：脱模静置动画
function runDemoldAnimation() {
    const moldRemoving = document.getElementById('mold-removing');
    const specimens = document.querySelectorAll('.specimen-item');
    
    // 脱模动画
    moldRemoving.classList.add('active');
    
    setTimeout(() => {
        // 显示试样
        specimens.forEach((specimen, index) => {
            setTimeout(() => {
                specimen.classList.add('show');
            }, index * 300);
        });
        
        setTimeout(() => {
            isAnimating = false;
        }, 1500);
    }, 1500);
}

// 步骤5：标准养护动画
function runCuringAnimation() {
    const door = document.getElementById('chamber-door');
    const tempValue = document.getElementById('temp-value');
    const humidityValue = document.getElementById('humidity-value');
    
    // 开门动画
    door.classList.add('open');
    
    setTimeout(() => {
        // 关门
        door.classList.remove('open');
        
        // 温湿度变化动画
        let temp = 18.0;
        let humidity = 85;
        
        const envTimer = setInterval(() => {
            if (temp < 20.0) temp += 0.2;
            if (humidity < 95) humidity += 1;
            
            tempValue.textContent = temp.toFixed(1) + '°C';
            humidityValue.textContent = humidity + '%';
            
            if (temp >= 20.0 && humidity >= 95) {
                clearInterval(envTimer);
                isAnimating = false;
            }
        }, 100);
    }, 2000);
}

// 步骤6：抗压强度测试动画
function runTestingAnimation() {
    const platen = document.getElementById('upper-platen');
    const specimen = document.getElementById('specimen-under-test');
    const crackEffect = document.getElementById('crack-effect');
    const loadValue = document.getElementById('load-value');
    const failureLoad = document.getElementById('failure-load');
    const strength = document.getElementById('compressive-strength');
    const grade = document.getElementById('strength-grade');
    const canvas = document.getElementById('pressure-canvas');
    
    // 开始加载动画
    platen.classList.add('active');
    
    // 绘制压力曲线
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.strokeStyle = '#165DFF';
    ctx.lineWidth = 2;
    
    let load = 0;
    let x = 0;
    const maxLoad = 93.1; // kN
    const targetX = canvas.width;
    
    const loadInterval = setInterval(() => {
        load += 0.5;
        x += 2;
        
        // 更新荷载显示
        loadValue.textContent = load.toFixed(2);
        
        // 绘制曲线
        const y = canvas.height - (load / maxLoad) * canvas.height * 0.8 - 10;
        if (x === 2) {
            ctx.moveTo(x, y);
        } else {
            ctx.lineTo(x, y);
            ctx.stroke();
        }
        
        if (load >= maxLoad || x >= targetX) {
            clearInterval(loadInterval);
            
            // 破坏动画
            specimen.classList.add('cracking');
            crackEffect.classList.add('show');
            
            // 显示结果
            setTimeout(() => {
                failureLoad.textContent = '93.12 kN';
                strength.textContent = '5.82 MPa';
                grade.textContent = '合格';
                grade.className = 'font-mono font-bold text-green-600';
                
                isAnimating = false;
            }, 500);
        }
    }, 30);
}

// 选择龄期
function selectAge(age) {
    document.querySelectorAll('.age-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-age="${age}"]`).classList.add('active');
    
    document.getElementById('current-age').textContent = age + 'd';
    
    // 更新水化阶段
    const stages = {
        '3': '加速期',
        '7': '稳定期',
        '28': '成熟期'
    };
    document.getElementById('hydration-stage').textContent = stages[age];
}

// ==========================================
// 7. 实验完成处理
// ==========================================

function completeExperiment() {
    const modal = document.getElementById('completion-modal');
    const modalContent = document.getElementById('modal-content');
    
    modal.classList.remove('hidden');
    
    setTimeout(() => {
        modalContent.style.transform = 'scale(1)';
    }, 10);
}

function closeModal() {
    const modal = document.getElementById('completion-modal');
    const modalContent = document.getElementById('modal-content');
    
    modalContent.style.transform = 'scale(0)';
    
    setTimeout(() => {
        modal.classList.add('hidden');
    }, 300);
}

// 全局函数供HTML调用
window.closeModal = closeModal;
window.resetExperiment = resetExperiment;
