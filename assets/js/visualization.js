/* ============================================
   数据可视化脚本 - visualization.js
   ============================================
   【功能说明】
   本文件负责试验数据可视化模块的功能实现：
   1. 配比-强度变化曲线（折线图）
   2. 固废掺量影响饼图（饼图）
   3. 长期服役性能折线图（多系列折线图）
   4. 微观形貌对比（图片展示）
   
   【数据来源】
   读取data/experiment.js中的chartsData配置
   使用ECharts库进行图表渲染
   ============================================ */

// 存储图表实例
let charts = {};

// ==========================================
// 1. 图表初始化
// ==========================================

/**
 * 初始化所有图表
 */
function initCharts() {
    if (typeof EXPERIMENT_DATA === 'undefined') {
        console.warn('EXPERIMENT_DATA未加载');
        return;
    }
    
    if (typeof echarts === 'undefined') {
        console.warn('ECharts库未加载');
        return;
    }
    
    const chartsData = EXPERIMENT_DATA.chartsData;
    if (!chartsData) return;
    
    // 初始化图表1：配比-强度变化曲线
    initMixRatioChart(chartsData.chart1_mixRatio);
    
    // 初始化图表2：固废掺量影响饼图
    initWasteContentChart(chartsData.chart2_wasteContent);
    
    // 初始化图表3：长期服役性能折线图
    initLongTermChart(chartsData.chart3_longTerm);
    
    // 初始化图表4：微观形貌对比
    initMicrostructureChart(chartsData.chart4_microstructure);
    
    // 监听窗口大小变化，自适应调整图表
    window.addEventListener('resize', () => {
        Object.values(charts).forEach(chart => {
            if (chart && chart.resize) {
                chart.resize();
            }
        });
    });
}

// ==========================================
// 2. 图表1：配比-强度变化曲线
// ==========================================

/**
 * 初始化配比-强度变化曲线
 */
function initMixRatioChart(data) {
    const container = document.getElementById('chart-mix-ratio');
    if (!container) return;
    
    // 检查数据是否已填充
    if (!data || !data.series || data.series[0].data.some(v => v === null || v === undefined)) {
        showEmptyState(container, '【请配置配比-强度数据】<br>在data/experiment.js中配置chart1_mixRatio');
        return;
    }
    
    const chart = echarts.init(container);
    charts.mixRatio = chart;
    
    const option = {
        title: {
            text: data.title,
            left: 'center',
            textStyle: {
                fontSize: 14,
                fontWeight: 'normal'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            data: data.series.map(s => s.name),
            bottom: 0
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            name: data.xAxis.name,
            nameLocation: 'middle',
            nameGap: 30,
            data: data.xAxis.data,
            axisLine: {
                lineStyle: {
                    color: '#86909C'
                }
            }
        },
        yAxis: {
            type: 'value',
            name: '强度 (MPa)',
            axisLine: {
                lineStyle: {
                    color: '#86909C'
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#F2F3F5'
                }
            }
        },
        series: data.series.map((s, index) => ({
            name: s.name,
            type: 'line',
            data: s.data,
            smooth: true,
            symbol: 'circle',
            symbolSize: 8,
            lineStyle: {
                width: 3
            },
            itemStyle: {
                color: ['#165DFF', '#00B42A', '#FF7D00'][index % 3]
            }
        }))
    };
    
    chart.setOption(option);
}

// ==========================================
// 3. 图表2：固废掺量影响饼图
// ==========================================

/**
 * 初始化固废掺量影响饼图
 */
function initWasteContentChart(data) {
    const container = document.getElementById('chart-waste-content');
    if (!container) return;
    
    // 检查数据是否已填充
    if (!data || !data.data || data.data[0].value === 70) {
        // 检查是否为默认数据
        showEmptyState(container, '【请配置固废掺量数据】<br>在data/experiment.js中配置chart2_wasteContent');
        return;
    }
    
    const chart = echarts.init(container);
    charts.wasteContent = chart;
    
    const option = {
        title: {
            text: data.title,
            left: 'center',
            textStyle: {
                fontSize: 14,
                fontWeight: 'normal'
            }
        },
        tooltip: {
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c}% ({d}%)'
        },
        legend: {
            orient: 'vertical',
            right: '5%',
            top: 'center'
        },
        series: [
            {
                name: '固废掺量',
                type: 'pie',
                radius: ['40%', '70%'],
                center: ['40%', '55%'],
                avoidLabelOverlap: false,
                itemStyle: {
                    borderRadius: 10,
                    borderColor: '#fff',
                    borderWidth: 2
                },
                label: {
                    show: false,
                    position: 'center'
                },
                emphasis: {
                    label: {
                        show: true,
                        fontSize: 16,
                        fontWeight: 'bold'
                    }
                },
                labelLine: {
                    show: false
                },
                data: data.data,
                color: ['#165DFF', '#14C9C9', '#FF7D00', '#F7BA1E', '#F53F3F']
            }
        ]
    };
    
    chart.setOption(option);
}

// ==========================================
// 4. 图表3：长期服役性能折线图
// ==========================================

/**
 * 初始化长期服役性能折线图
 */
function initLongTermChart(data) {
    const container = document.getElementById('chart-long-term');
    if (!container) return;
    
    // 检查数据是否已填充
    if (!data || !data.series || data.series[0].data[0] === 0.8) {
        showEmptyState(container, '【请配置长期性能数据】<br>在data/experiment.js中配置chart3_longTerm');
        return;
    }
    
    const chart = echarts.init(container);
    charts.longTerm = chart;
    
    const option = {
        title: {
            text: data.title,
            left: 'center',
            textStyle: {
                fontSize: 14,
                fontWeight: 'normal'
            }
        },
        tooltip: {
            trigger: 'axis',
            axisPointer: {
                type: 'cross'
            }
        },
        legend: {
            data: data.series.map(s => s.name),
            bottom: 0
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '15%',
            containLabel: true
        },
        xAxis: {
            type: 'category',
            name: data.xAxis.name,
            nameLocation: 'middle',
            nameGap: 30,
            data: data.xAxis.data,
            axisLine: {
                lineStyle: {
                    color: '#86909C'
                }
            }
        },
        yAxis: {
            type: 'value',
            name: '强度 (MPa)',
            axisLine: {
                lineStyle: {
                    color: '#86909C'
                }
            },
            splitLine: {
                lineStyle: {
                    color: '#F2F3F5'
                }
            }
        },
        series: data.series.map((s, index) => ({
            name: s.name,
            type: 'line',
            data: s.data,
            smooth: true,
            symbol: 'circle',
            symbolSize: 6,
            lineStyle: {
                width: 2
            },
            itemStyle: {
                color: ['#165DFF', '#00B42A'][index % 2]
            }
        }))
    };
    
    chart.setOption(option);
}

// ==========================================
// 5. 图表4：微观形貌对比
// ==========================================

/**
 * 初始化微观形貌对比
 */
function initMicrostructureChart(data) {
    const container = document.getElementById('chart-microstructure');
    if (!container) return;
    
    // 检查数据是否已填充
    if (!data || !data.images || data.images[0].src.includes('【请添加')) {
        showEmptyState(container, '【请添加微观形貌图片】<br>在assets/images/目录添加SEM图片<br>并在data/experiment.js中配置chart4_microstructure');
        return;
    }
    
    // 微观形貌使用图片展示而非图表
    let html = '<div class="grid grid-cols-3 gap-2 h-full">';
    data.images.forEach((img, index) => {
        html += `
            <div class="relative group cursor-pointer" onclick="showImageModal('${img.src}', '${img.name}')">
                <div class="w-full h-full bg-gray-100 rounded-lg overflow-hidden">
                    <img src="${img.src}" alt="${img.name}" 
                         class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                         onerror="this.parentElement.innerHTML='<div class=\\'flex items-center justify-center h-full text-gray-400 text-xs\\'>${img.name}</div>'">
                </div>
                <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent p-2">
                    <p class="text-white text-xs text-center">${img.name}</p>
                </div>
            </div>
        `;
    });
    html += '</div>';
    
    container.innerHTML = html;
}

// ==========================================
// 6. 辅助函数
// ==========================================

/**
 * 显示空状态提示
 */
function showEmptyState(container, message) {
    container.innerHTML = `
        <div class="w-full h-full flex items-center justify-center">
            <div class="text-center text-gray-400">
                <svg class="w-12 h-12 mx-auto mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"/>
                </svg>
                <p class="text-sm">${message}</p>
            </div>
        </div>
    `;
}

/**
 * 显示图片大图（模态框）
 */
function showImageModal(src, caption) {
    // 创建模态框
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black/80 z-50 flex items-center justify-center p-4';
    modal.onclick = () => modal.remove();
    
    modal.innerHTML = `
        <div class="max-w-4xl max-h-full">
            <img src="${src}" alt="${caption}" class="max-w-full max-h-[80vh] object-contain rounded-lg">
            <p class="text-white text-center mt-4">${caption}</p>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// ==========================================
// 7. 初始化
// ==========================================

document.addEventListener('DOMContentLoaded', () => {
    // 延迟初始化，确保ECharts和数据文件已加载
    setTimeout(() => {
        initCharts();
    }, 200);
});
