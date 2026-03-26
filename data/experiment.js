/* ============================================
   实验数据配置文件 - experiment.js
   ============================================
   【重要说明】
   本文件包含交互模型计算器和数据可视化所需的
   所有实验数据和计算公式
   
   【修改方法】
   1. 完成实验后，将实验数据填入对应位置
   2. 严格按照注释中的【数据格式要求】填写
   3. 保持JavaScript语法正确（逗号、括号等）
   4. 修改完成后保存，刷新网页即可生效
   ============================================ */

const EXPERIMENT_DATA = {
    /* ==========================================
       1. 配比优化计算器 - 输入参数配置
       ==========================================
       【说明】定义计算器左侧输入区的所有参数
       【数据格式】每个参数对象包含：
       - id: 参数唯一标识（英文，用于代码识别）
       - name: 参数显示名称（中文）
       - unit: 单位（如：%、kg/m³）
       - min: 最小值
       - max: 最大值
       - step: 步进值（滑块调节精度）
       - default: 默认值
       - description: 参数说明
       ========================================== */
    inputParams: [
        {
            id: "tailings_ratio",
            name: "铁尾矿掺量",
            unit: "%",
            min: 0,
            max: 100,
            step: 5,
            default: 70,
            description: "铁尾矿在胶结材料中的质量百分比"
        },
        {
            id: "cement_ratio",
            name: "水泥掺量",
            unit: "%",
            min: 0,
            max: 30,
            step: 1,
            default: 15,
            description: "普通硅酸盐水泥的质量百分比"
        },
        {
            id: "slag_ratio",
            name: "矿渣粉掺量",
            unit: "%",
            min: 0,
            max: 30,
            step: 1,
            default: 10,
            description: "矿渣微粉的质量百分比"
        },
        {
            id: "flyash_ratio",
            name: "粉煤灰掺量",
            unit: "%",
            min: 0,
            max: 20,
            step: 1,
            default: 5,
            description: "粉煤灰的质量百分比"
        },
        {
            id: "water_binder",
            name: "水胶比",
            unit: "",
            min: 0.3,
            max: 1.0,
            step: 0.05,
            default: 0.6,
            description: "水与胶凝材料的质量比"
        },
        {
            id: "solid_content",
            name: "质量浓度",
            unit: "%",
            min: 70,
            max: 85,
            step: 1,
            default: 78,
            description: "充填料浆中固体质量占总质量的百分比"
        }
    ],
    
    /* ==========================================
       2. 配比优化计算器 - 核心计算公式
       ==========================================
       【重要说明】
       此处填写配比优化的核心计算公式
       公式使用JavaScript函数形式编写
       
       【示例格式】
       calculationFormula: function(inputs) {
           // inputs包含所有输入参数值
           // 例如：inputs.tailings_ratio 获取铁尾矿掺量
           
           // 在这里编写计算公式
           const strength = ...;  // 计算强度
           const cost = ...;      // 计算成本
           
           // 返回计算结果
           return {
               strength: strength,  // 预测强度 (MPa)
               cost: cost,          // 材料成本 (元/m³)
               density: density,    // 充填体密度 (kg/m³)
               grade: grade         // 性能等级 (A/B/C/D)
           };
       }
       
       【注意】
       - 函数必须返回一个对象
       - 对象应包含strength(强度)、cost(成本)等关键指标
       - 可根据实际研究内容添加更多输出指标
       ========================================== */
    calculationFormula: function(inputs) {
        // 【请在此处填写实际计算公式】
        // 以下为示例框架，请根据实验数据替换
        
        // 获取输入参数
        const tailings = inputs.tailings_ratio || 70;
        const cement = inputs.cement_ratio || 15;
        const slag = inputs.slag_ratio || 10;
        const flyash = inputs.flyash_ratio || 5;
        const wb = inputs.water_binder || 0.6;
        const solid = inputs.solid_content || 78;
        
        // 【请根据实验数据建立计算公式】
        // 示例：基于回归分析的经验公式
        // 实际使用时请替换为真实的拟合公式
        
        // 预测强度计算（示例）
        const strength = 2.5 + 0.15 * cement - 0.8 * wb + 0.02 * slag;
        
        // 材料成本计算（示例）
        const cost = 50 + 5 * cement + 2 * slag + 1.5 * flyash;
        
        // 充填体密度估算
        const density = 1800 + 5 * solid;
        
        // 性能等级评定
        let grade = "C";
        if (strength >= 5) grade = "A";
        else if (strength >= 3) grade = "B";
        else if (strength >= 1.5) grade = "C";
        else grade = "D";
        
        // 返回计算结果
        return {
            strength: strength.toFixed(2),      // 预测强度 (MPa)
            cost: cost.toFixed(2),              // 材料成本 (元/m³)
            density: density.toFixed(0),        // 充填体密度 (kg/m³)
            grade: grade,                       // 性能等级
            slump: (20 - wb * 10).toFixed(1),   // 坍落度 (cm)
            bleeding: (wb * 5).toFixed(2)       // 泌水率 (%)
        };
    },
    
    /* ==========================================
       3. 性能评价标准
       ==========================================
       【说明】定义充填体性能等级评定标准
       【数据格式】对象数组，每个等级包含：
       - grade: 等级名称（A/B/C/D）
       - minStrength: 最小强度要求 (MPa)
       - maxStrength: 最大强度要求 (MPa)
       - description: 等级描述
       - color: 显示颜色
       ========================================== */
    evaluationCriteria: [
        {
            grade: "A",
            minStrength: 5.0,
            maxStrength: 999,
            description: "优秀：满足高强度充填要求",
            color: "#00b42a"
        },
        {
            grade: "B",
            minStrength: 3.0,
            maxStrength: 5.0,
            description: "良好：满足一般充填要求",
            color: "#165DFF"
        },
        {
            grade: "C",
            minStrength: 1.5,
            maxStrength: 3.0,
            description: "合格：满足基本充填要求",
            color: "#ff7d00"
        },
        {
            grade: "D",
            minStrength: 0,
            maxStrength: 1.5,
            description: "不合格：不满足充填要求",
            color: "#f53f3f"
        }
    ],
    
    /* ==========================================
       4. 数据可视化 - 图表数据
       ==========================================
       【说明】配置4个图表的实验数据
       完成实验后，将数据填入对应位置
       ========================================== */
    
    chartsData: {
        /* --------------------------------------
           图表1：配比-强度变化曲线
           【数据格式】
           - xAxis: X轴数据（配比参数）
           - series: 多组强度数据，每组包含：
             * name: 系列名称
             * data: Y轴数据（强度值数组）
           -------------------------------------- */
        chart1_mixRatio: {
            title: "配比-强度变化曲线",
            xAxis: {
                name: "水泥掺量 (%)",
                data: [5, 10, 15, 20, 25, 30]  // 【请填写实际X轴数据】
            },
            series: [
                {
                    name: "7天强度",
                    data: [1.2, 2.1, 3.5, 4.8, 5.5, 6.2]  // 【请填写7天强度数据】
                },
                {
                    name: "28天强度",
                    data: [2.0, 3.5, 5.2, 6.8, 7.5, 8.1]  // 【请填写28天强度数据】
                },
                {
                    name: "90天强度",
                    data: [2.8, 4.5, 6.5, 8.2, 9.0, 9.5]  // 【请填写90天强度数据】
                }
            ]
        },
        
        /* --------------------------------------
           图表2：固废掺量影响饼图
           【数据格式】
           - data: 数组，每个元素包含：
             * name: 固废类型名称
             * value: 掺量百分比
           -------------------------------------- */
        chart2_wasteContent: {
            title: "固废掺量影响分析",
            data: [
                { name: "铁尾矿", value: 70 },    // 【请填写实际数据】
                { name: "矿渣粉", value: 15 },    // 【请填写实际数据】
                { name: "粉煤灰", value: 10 },    // 【请填写实际数据】
                { name: "其他固废", value: 5 }    // 【请填写实际数据】
            ]
        },
        
        /* --------------------------------------
           图表3：长期服役性能折线图
           【数据格式】
           - xAxis: X轴数据（时间）
           - series: 多组性能数据
           -------------------------------------- */
        chart3_longTerm: {
            title: "长期服役性能发展",
            xAxis: {
                name: "龄期 (天)",
                data: [3, 7, 14, 28, 60, 90, 180, 360]  // 【请填写实际时间数据】
            },
            series: [
                {
                    name: "抗压强度",
                    data: [0.8, 1.5, 2.8, 4.5, 6.2, 7.5, 8.8, 9.5]  // 【请填写强度数据】
                },
                {
                    name: "抗折强度",
                    data: [0.2, 0.4, 0.7, 1.1, 1.5, 1.8, 2.1, 2.3]  // 【请填写抗折强度数据】
                }
            ]
        },
        
        /* --------------------------------------
           图表4：微观形貌对比
           【数据格式】
           - type: "image" 表示图片对比
           - images: 图片数组，每个包含：
             * name: 图片说明
             * src: 图片路径（存放在assets/images/）
           -------------------------------------- */
        chart4_microstructure: {
            title: "微观形貌对比",
            type: "image",
            images: [
                {
                    name: "配比A（低水泥）",
                    src: "assets/images/micro_a.jpg"  // 【请添加实际图片】
                },
                {
                    name: "配比B（中水泥）",
                    src: "assets/images/micro_b.jpg"  // 【请添加实际图片】
                },
                {
                    name: "配比C（高水泥）",
                    src: "assets/images/micro_c.jpg"  // 【请添加实际图片】
                }
            ]
        }
    },
    
    /* ==========================================
       5. 实验参数范围说明
       ==========================================
       【说明】用于计算器页面的参数说明区域
       ========================================== */
    parameterDescriptions: {
        tailings_ratio: "铁尾矿是主要骨料，掺量通常在60%-80%之间。掺量过高会影响强度，过低则不经济。",
        cement_ratio: "水泥是主要胶凝材料，提供早期强度。一般控制在10%-20%。",
        slag_ratio: "矿渣粉具有潜在水硬性，可改善后期强度和工作性。",
        flyash_ratio: "粉煤灰可改善工作性，但过量会延缓凝结时间。",
        water_binder: "水胶比直接影响强度和流动性，充填材料一般在0.5-0.8之间。",
        solid_content: "质量浓度影响料浆的输送性能和离析程度，一般控制在75%-82%。"
    }
};

/* ============================================
   数据导出（供其他脚本使用）
   请勿修改以下代码
   ============================================ */
if (typeof module !== 'undefined' && module.exports) {
    module.exports = EXPERIMENT_DATA;
}
