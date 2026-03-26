/* ============================================
   理论学习中心数据配置文件 - study.js
   ============================================
   【重要说明】
   本文件包含理论学习中心的5个固定章节内容
   所有内容基于铁尾矿基胶结充填体相关学术论文
   
   【章节结构】
   每个章节包含：title(标题)、content(HTML内容)、formulas(公式数组)、imgUrl(配图路径)
   
   【公式格式】
   LaTeX格式，可被KaTeX/MathJax渲染
   ============================================ */

const STUDY_CHAPTERS = [
    // ==========================================
    // 章节1：铁尾矿基本性质
    // ==========================================
    {
        id: "chapter-1",
        title: "铁尾矿基本性质",
        content: `
            <div class="chapter-section">
                <h3 class="text-xl font-bold text-gray-900 mb-4">1.1 铁尾矿的来源与固废属性</h3>
                <p class="text-gray-700 mb-4 leading-relaxed">
                    铁尾矿是铁矿石选矿过程中产生的固体废弃物。我国作为世界最大的铁矿石消费国，每年产生铁尾矿超过<span class="highlight-number">15亿吨</span>，累计堆存量已超过<span class="highlight-number">100亿吨</span>。
                    铁尾矿的堆存不仅占用大量土地资源，还存在溃坝、重金属渗漏等环境风险。
                </p>
                <p class="text-gray-700 mb-4 leading-relaxed">
                    铁矿选矿工艺主要包括磁选、浮选、重选等方法，不同工艺产生的尾矿在粒度分布、矿物组成上存在显著差异。磁选尾矿通常粒度较粗，而浮选尾矿则含有大量细颗粒泥质成分。
                </p>
            </div>
            
            <div class="chapter-section">
                <h3 class="text-xl font-bold text-gray-900 mb-4">1.2 铁尾矿的化学组成特征</h3>
                <p class="text-gray-700 mb-4 leading-relaxed">
                    高硅型铁尾矿的主要化学成分包括：SiO₂（含量通常在<span class="highlight-number">60-75%</span>）、Al₂O₃（<span class="highlight-number">5-15%</span>）、TFe（全铁，<span class="highlight-number">8-20%</span>）、CaO（<span class="highlight-number">2-8%</span>）、MgO（<span class="highlight-number">1-5%</span>）等。
                </p>
                <div class="info-box bg-blue-50 p-4 rounded-lg mb-4">
                    <p class="text-sm text-gray-700"><strong>地域差异：</strong>不同地区铁尾矿的化学成分差异明显。例如，鞍山地区铁尾矿SiO₂含量较高（>70%），而冀东地区铁尾矿TFe含量相对较高（>15%）。</p>
                </div>
                <p class="text-gray-700 mb-4 leading-relaxed">
                    有害杂质主要包括：硫化物（S）、重金属（Pb、Zn、Cu、Cd等）、放射性元素等。这些成分在充填利用前需要进行环境安全性评价。
                </p>
            </div>
            
            <div class="chapter-section">
                <h3 class="text-xl font-bold text-gray-900 mb-4">1.3 铁尾矿的矿物组成</h3>
                <p class="text-gray-700 mb-4 leading-relaxed">
                    铁尾矿的主要矿物相包括：石英（SiO₂）、浅闪石（Ca₂Mg₅Si₈O₂₂(OH)₂）、水钙沸石、角闪石、磁铁矿（Fe₃O₄）、赤铁矿（Fe₂O₃）等。
                </p>
                <p class="text-gray-700 mb-4 leading-relaxed">
                    XRD（X射线衍射）图谱是分析矿物组成的重要手段。典型的高硅铁尾矿XRD图谱在2θ=26.6°、20.8°、50.1°等处出现明显的石英特征峰。
                </p>
            </div>
            
            <div class="chapter-section">
                <h3 class="text-xl font-bold text-gray-900 mb-4">1.4 铁尾矿的物理性质</h3>
                <ul class="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li><strong>粒度分布：</strong>全尾矿粒度范围通常为0.002-2mm，d₅₀（中值粒径）在0.05-0.3mm之间</li>
                    <li><strong>比重：</strong>铁尾矿比重一般为2.6-3.2 g/cm³，高于普通砂石骨料</li>
                    <li><strong>比表面积：</strong>Blaine比表面积通常为200-600 m²/kg</li>
                    <li><strong>孔隙率：</strong>松散堆积孔隙率约40-50%，紧密堆积孔隙率约35-42%</li>
                </ul>
                <p class="text-gray-700 mb-4 leading-relaxed">
                    粗尾矿（>0.075mm）与超细尾矿（<0.075mm）在物理特性上存在显著差异。超细尾矿比表面积大、需水量高，对充填体工作性能影响显著。
                </p>
            </div>
            
            <div class="chapter-section">
                <h3 class="text-xl font-bold text-gray-900 mb-4">1.5 铁尾矿的活性特征</h3>
                <p class="text-gray-700 mb-4 leading-relaxed">
                    铁尾矿具有<span class="highlight-term" data-term="潜在火山灰活性">潜在火山灰活性</span>，其主要活性成分是玻璃质SiO₂和Al₂O₃。但在常温下，铁尾矿表现为<span class="highlight-term" data-term="惰性材料">惰性材料</span>，活性指数通常低于50%。
                </p>
                <p class="text-gray-700 mb-4 leading-relaxed">
                    <strong>活性提升方法：</strong>
                </p>
                <ul class="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li><strong>机械活化：</strong>通过粉磨增加比表面积，破坏晶体结构，提高反应活性</li>
                    <li><strong>化学激发：</strong>添加碱激发剂（NaOH、Na₂SiO₃等）或硫酸盐激发剂（CaSO₄·2H₂O）打破Si-O、Al-O键</li>
                    <li><strong>热活化：</strong>高温煅烧（600-900°C）使矿物相转变，产生活性</li>
                </ul>
            </div>
            
            <div class="chapter-section">
                <h3 class="text-xl font-bold text-gray-900 mb-4">1.6 不同选矿工艺铁尾矿的特性差异</h3>
                <table class="w-full border-collapse border border-gray-300 mb-4">
                    <thead>
                        <tr class="bg-gray-100">
                            <th class="border border-gray-300 px-4 py-2">选矿工艺</th>
                            <th class="border border-gray-300 px-4 py-2">粒度特征</th>
                            <th class="border border-gray-300 px-4 py-2">主要成分</th>
                            <th class="border border-gray-300 px-4 py-2">充填适用性</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="border border-gray-300 px-4 py-2">磁选</td>
                            <td class="border border-gray-300 px-4 py-2">粗颗粒为主</td>
                            <td class="border border-gray-300 px-4 py-2">SiO₂、Fe₃O₄</td>
                            <td class="border border-gray-300 px-4 py-2">良好，需水量低</td>
                        </tr>
                        <tr>
                            <td class="border border-gray-300 px-4 py-2">浮选</td>
                            <td class="border border-gray-300 px-4 py-2">细颗粒、泥质</td>
                            <td class="border border-gray-300 px-4 py-2">SiO₂、浮选药剂残留</td>
                            <td class="border border-gray-300 px-4 py-2">需调整配比</td>
                        </tr>
                        <tr>
                            <td class="border border-gray-300 px-4 py-2">重选</td>
                            <td class="border border-gray-300 px-4 py-2">中等粒度</td>
                            <td class="border border-gray-300 px-4 py-2">SiO₂、Fe₂O₃</td>
                            <td class="border border-gray-300 px-4 py-2">较好</td>
                        </tr>
                        <tr>
                            <td class="border border-gray-300 px-4 py-2">强磁选</td>
                            <td class="border border-gray-300 px-4 py-2">细颗粒</td>
                            <td class="border border-gray-300 px-4 py-2">SiO₂、弱磁性矿物</td>
                            <td class="border border-gray-300 px-4 py-2">需激发处理</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `,
        formulas: [
            {
                name: "不均匀系数",
                latex: "C_u = \\frac{d_{60}}{d_{10}}",
                desc: "其中d₆₀为累计通过60%的粒径，d₁₀为累计通过10%的粒径。Cu>5表示级配良好，Cu<3表示级配均匀。"
            },
            {
                name: "曲率系数",
                latex: "C_c = \\frac{(d_{30})^2}{d_{10} \\times d_{60}}",
                desc: "其中d₃₀为累计通过30%的粒径。Cc在1-3之间表示级配连续，有利于充填体密实度。"
            },
            {
                name: "铁尾矿碱度系数",
                latex: "M_o = \\frac{\\text{CaO} + \\text{MgO}}{\\text{SiO}_2 + \\text{Al}_2\\text{O}_3}",
                desc: "用于评价铁尾矿的碱性活性。Mo>1为高碱性尾矿，0.5<Mo<1为中碱性，Mo<0.5为低碱性（高硅型）。"
            }
        ],
        imgUrl: "./assets/images/铁尾矿基本性质胶结充填核心基础.jpg"
    },
    
    // ==========================================
    // 章节2：胶结充填理论基础
    // ==========================================
    {
        id: "chapter-2",
        title: "胶结充填理论基础",
        content: `
            <div class="chapter-section">
                <h3 class="text-xl font-bold text-gray-900 mb-4">2.1 矿山胶结充填采矿法基本原理</h3>
                <p class="text-gray-700 mb-4 leading-relaxed">
                    胶结充填采矿法是将尾矿、废石等固废材料与胶凝材料混合制成充填料浆，通过管道输送充填到采空区，形成具有一定强度的充填体，以支撑围岩、控制地压的采矿方法。
                </p>
                <p class="text-gray-700 mb-4 leading-relaxed">
                    <strong>全尾砂胶结充填技术</strong>是将选矿厂排出的全部尾矿（不分级）作为骨料，与水泥等胶凝材料混合制成充填料浆。该技术具有固废消纳率高、充填成本低的优势，是现代绿色矿山建设的核心技术之一。
                </p>
                <div class="info-box bg-green-50 p-4 rounded-lg mb-4">
                    <p class="text-sm text-gray-700"><strong>技术优势：</strong>① 尾矿利用率>90%；② 充填体强度可达1-5MPa；③ 有效控制地表沉降；④ 减少尾矿库建设需求。</p>
                </div>
            </div>
            
            <div class="chapter-section">
                <h3 class="text-xl font-bold text-gray-900 mb-4">2.2 铁尾矿基胶凝材料的水化硬化机理</h3>
                <p class="text-gray-700 mb-4 leading-relaxed">
                    铁尾矿基胶凝材料的水化硬化是一个复杂的物理化学过程，主要包括以下反应：
                </p>
                <h4 class="text-lg font-semibold text-gray-800 mb-2">（1）水泥熟料的水化反应</h4>
                <p class="text-gray-700 mb-4 leading-relaxed">
                    硅酸三钙（C₃S）和硅酸二钙（C₂S）是水泥熟料的主要成分，在水作用下发生水化反应生成<span class="highlight-term" data-term="C-S-H凝胶">C-S-H凝胶</span>和氢氧化钙（CH）。
                </p>
                <h4 class="text-lg font-semibold text-gray-800 mb-2">（2）矿渣微粉的碱激发反应</h4>
                <p class="text-gray-700 mb-4 leading-relaxed">
                    在碱性环境（pH>12）下，矿渣玻璃体中的Si-O、Al-O键断裂，发生解聚-缩聚反应，生成额外的C-S-H凝胶和<span class="highlight-term" data-term="C-A-H凝胶">C-A-H凝胶</span>。
                </p>
                <h4 class="text-lg font-semibold text-gray-800 mb-2">（3）石膏的硫酸盐激发作用</h4>
                <p class="text-gray-700 mb-4 leading-relaxed">
                    石膏（CaSO₄·2H₂O）提供SO₄²⁻离子，与铝相反应生成<span class="highlight-term" data-term="钙矾石（AFt）">钙矾石（AFt）</span>晶体，早期产生微膨胀填充孔隙，后期转化为单硫型水化硫铝酸钙（AFm）。
                </p>
            </div>
            
            <div class="chapter-section">
                <h3 class="text-xl font-bold text-gray-900 mb-4">2.3 铁尾矿胶结充填体的强度形成机理</h3>
                <p class="text-gray-700 mb-4 leading-relaxed">
                    充填体强度的形成涉及三个层面的作用机制：
                </p>
                <ul class="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li><strong>孔隙填充作用：</strong>水化产物（C-S-H凝胶、AFt晶体、CH）填充骨料间的孔隙，增加密实度</li>
                    <li><strong>界面过渡区强化：</strong>水化产物在骨料表面形成致密层，改善骨料-胶凝材料界面粘结</li>
                    <li><strong>骨架结构形成：</strong>粗细颗粒相互嵌挤形成骨架，胶凝材料提供粘结力</li>
                </ul>
                <p class="text-gray-700 mb-4 leading-relaxed">
                    强度发展规律：3d强度达到28d强度的30-40%，7d达到60-70%，28d达到设计强度。后期强度持续增长，90d强度可达28d的110-120%。
                </p>
            </div>
            
            <div class="chapter-section">
                <h3 class="text-xl font-bold text-gray-900 mb-4">2.4 养护条件对胶结充填体性能的影响机理</h3>
                <table class="w-full border-collapse border border-gray-300 mb-4">
                    <thead>
                        <tr class="bg-gray-100">
                            <th class="border border-gray-300 px-4 py-2">养护条件</th>
                            <th class="border border-gray-300 px-4 py-2">温度范围</th>
                            <th class="border border-gray-300 px-4 py-2">对水化的影响</th>
                            <th class="border border-gray-300 px-4 py-2">对强度的影响</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="border border-gray-300 px-4 py-2">标准养护</td>
                            <td class="border border-gray-300 px-4 py-2">20±2°C，RH>95%</td>
                            <td class="border border-gray-300 px-4 py-2">水化反应正常进行</td>
                            <td class="border border-gray-300 px-4 py-2">强度发展符合预期</td>
                        </tr>
                        <tr>
                            <td class="border border-gray-300 px-4 py-2">低温养护</td>
                            <td class="border border-gray-300 px-4 py-2">0-10°C</td>
                            <td class="border border-gray-300 px-4 py-2">水化速率显著降低</td>
                            <td class="border border-gray-300 px-4 py-2">早期强度损失20-40%</td>
                        </tr>
                        <tr>
                            <td class="border border-gray-300 px-4 py-2">冻融循环</td>
                            <td class="border border-gray-300 px-4 py-2">-20~+20°C</td>
                            <td class="border border-gray-300 px-4 py-2">内部冰晶产生膨胀应力</td>
                            <td class="border border-gray-300 px-4 py-2">表面剥蚀，强度衰减</td>
                        </tr>
                        <tr>
                            <td class="border border-gray-300 px-4 py-2">饱和水浸</td>
                            <td class="border border-gray-300 px-4 py-2">常温水中</td>
                            <td class="border border-gray-300 px-4 py-2">持续水化，但Ca²⁺溶出</td>
                            <td class="border border-gray-300 px-4 py-2">长期强度稳定增长</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="chapter-section">
                <h3 class="text-xl font-bold text-gray-900 mb-4">2.5 膏体充填的流变理论基础</h3>
                <p class="text-gray-700 mb-4 leading-relaxed">
                    膏体充填料浆是一种非牛顿流体，具有剪切稀化特性。其流变行为可用<span class="highlight-term" data-term="Bingham模型">Bingham模型</span>描述：
                </p>
                <p class="text-gray-700 mb-4 leading-relaxed">
                    <strong>工作性评价指标：</strong>
                </p>
                <ul class="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li><strong>坍落度：</strong>表征料浆的流动性，膏体充填要求180-220mm</li>
                    <li><strong>流动度：</strong>扩展度试验，反映料浆的流动能力</li>
                    <li><strong>屈服应力：</strong>料浆开始流动所需的最小剪切应力</li>
                    <li><strong>塑性粘度：</strong>料浆流动时的内摩擦阻力</li>
                </ul>
            </div>
            
            <div class="chapter-section">
                <h3 class="text-xl font-bold text-gray-900 mb-4">2.6 胶结充填体的损伤演化基础理论</h3>
                <p class="text-gray-700 mb-4 leading-relaxed">
                    充填体在受力过程中经历弹性变形、塑性变形、损伤累积和最终破坏四个阶段。应力-应变曲线呈现明显的非线性特征。
                </p>
                <p class="text-gray-700 mb-4 leading-relaxed">
                    <strong>孔隙率-强度关系：</strong>根据Powers理论，充填体强度与孔隙率呈指数关系。孔隙率每降低1%，抗压强度可提高约5-8%。
                </p>
                <p class="text-gray-700 mb-4 leading-relaxed">
                    <strong>动载响应：</strong>在冲击荷载作用下，充填体表现出应变率敏感性。应变率每增加一个数量级，动态强度可提高20-40%。
                </p>
            </div>
        `,
        formulas: [
            {
                name: "硅酸三钙水化反应",
                latex: "2\\text{C}_3\\text{S} + 6\\text{H}_2\\text{O} \\rightarrow \\text{C}_3\\text{S}_2\\text{H}_3 + 3\\text{Ca(OH)}_2",
                desc: "C₃S（硅酸三钙）与水反应生成C-S-H凝胶（C₃S₂H₃）和氢氧化钙（CH）。C-S-H凝胶是强度的主要贡献相。"
            },
            {
                name: "胶凝材料碱度系数",
                latex: "pH = 14 + \\lg[\\text{OH}^-]",
                desc: "胶凝体系pH值通常>12，为矿渣等潜在水硬性材料的碱激发提供必要条件。高碱度促进玻璃体解聚。"
            },
            {
                name: "充填体孔隙率与强度关系",
                latex: "f_c = A \\cdot x^n \\cdot \\exp(-B\\cdot P)",
                desc: "其中f_c为抗压强度，P为孔隙率，A、B为材料常数，x为胶凝材料含量。该公式表明强度随孔隙率增加呈指数衰减。"
            }
        ],
        imgUrl: "./assets/images/胶结充填理论基础.jpg"
    },
    
    // ==========================================
    // 章节3：配比设计方法
    // ==========================================
    {
        id: "chapter-3",
        title: "配比设计方法",
        content: `
            <div class="chapter-section">
                <h3 class="text-xl font-bold text-gray-900 mb-4">3.1 配比设计的核心原则</h3>
                <p class="text-gray-700 mb-4 leading-relaxed">
                    铁尾矿基胶凝材料配比设计需综合考虑以下要求：
                </p>
                <ul class="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li><strong>强度要求：</strong>满足矿山充填体设计强度（通常28d抗压强度0.5-5MPa）</li>
                    <li><strong>工作性要求：</strong>料浆坍落度≥180mm，不离析、不泌水</li>
                    <li><strong>耐久性要求：</strong>抗冻融、抗渗、长期水稳定性</li>
                    <li><strong>经济性要求：</strong>降低水泥用量，控制充填成本</li>
                    <li><strong>固废消纳率：</strong>最大化利用铁尾矿等工业固废</li>
                </ul>
            </div>
            
            <div class="chapter-section">
                <h3 class="text-xl font-bold text-gray-900 mb-4">3.2 正交试验设计方法</h3>
                <p class="text-gray-700 mb-4 leading-relaxed">
                    正交试验是研究多因素多水平问题的有效方法。对于铁尾矿基胶凝材料，通常选用<span class="highlight-term" data-term="L₉(3⁴)正交表">L₉(3⁴)正交表</span>，考察4个因素、每个因素3个水平。
                </p>
                <h4 class="text-lg font-semibold text-gray-800 mb-2">四大核心因素：</h4>
                <ol class="list-decimal list-inside text-gray-700 mb-4 space-y-2">
                    <li><strong>铁尾矿掺量（A）：</strong>通常50-80%，影响骨料级配和活性</li>
                    <li><strong>水泥熟料掺量（B）：</strong>通常10-30%，提供主要胶凝性</li>
                    <li><strong>石膏掺量（C）：</strong>通常3-8%，调节凝结时间和微膨胀</li>
                    <li><strong>水胶比（D）：</strong>通常0.4-0.6，影响工作性和强度</li>
                </ol>
                <div class="info-box bg-yellow-50 p-4 rounded-lg mb-4">
                    <p class="text-sm text-gray-700"><strong>试验设计原则：</strong>因素水平应覆盖实际工程可能的取值范围，水平间距应均匀分布。每组配比制备3个平行试件，取平均值作为试验结果。</p>
                </div>
            </div>
            
            <div class="chapter-section">
                <h3 class="text-xl font-bold text-gray-900 mb-4">3.3 试验结果分析方法</h3>
                <p class="text-gray-700 mb-4 leading-relaxed">
                    <strong>极差分析法（R法）</strong>是正交试验结果分析的基本方法，步骤如下：
                </p>
                <ol class="list-decimal list-inside text-gray-700 mb-4 space-y-2">
                    <li>计算各因素各水平下的试验指标平均值K₁、K₂、K₃</li>
                    <li>计算各因素的极差R = max(K) - min(K)</li>
                    <li>根据R值大小判断因素主次顺序（R越大，影响越显著）</li>
                    <li>根据K值确定各因素的最优水平组合</li>
                </ol>
                <p class="text-gray-700 mb-4 leading-relaxed">
                    对于强度指标，选择使K值最大的水平；对于需水量等指标，根据具体要求选择合适水平。
                </p>
            </div>
            
            <div class="chapter-section">
                <h3 class="text-xl font-bold text-gray-900 mb-4">3.4 单因素变量试验设计</h3>
                <p class="text-gray-700 mb-4 leading-relaxed">
                    在正交试验确定最优水平范围后，通过单因素变量试验精确确定最佳掺量。
                </p>
                <h4 class="text-lg font-semibold text-gray-800 mb-2">水胶比优化：</h4>
                <p class="text-gray-700 mb-4 leading-relaxed">
                    水胶比直接影响充填体强度和料浆工作性。水胶比过小，料浆过于粘稠，难以泵送；水胶比过大，强度降低，泌水增加。最佳水胶比应使料浆坍落度在180-220mm范围内，同时满足强度要求。
                </p>
                <h4 class="text-lg font-semibold text-gray-800 mb-2">灰砂比优化：</h4>
                <p class="text-gray-700 mb-4 leading-relaxed">
                    灰砂比（胶凝材料/骨料）是控制充填体强度的关键参数。灰砂比每增加0.01，28d抗压强度可提高约0.1-0.2MPa。但过高的灰砂比会增加成本，一般控制在1:4至1:8之间。
                </p>
            </div>
            
            <div class="chapter-section">
                <h3 class="text-xl font-bold text-gray-900 mb-4">3.5 多固废协同配比优化</h3>
                <p class="text-gray-700 mb-4 leading-relaxed">
                    多固废协同胶凝体系的设计原理是：利用不同固废的化学组成互补性，实现"一废多治"。
                </p>
                <table class="w-full border-collapse border border-gray-300 mb-4">
                    <thead>
                        <tr class="bg-gray-100">
                            <th class="border border-gray-300 px-4 py-2">固废种类</th>
                            <th class="border border-gray-300 px-4 py-2">主要活性成分</th>
                            <th class="border border-gray-300 px-4 py-2">在体系中的作用</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="border border-gray-300 px-4 py-2">铁尾矿</td>
                            <td class="border border-gray-300 px-4 py-2">SiO₂、Al₂O₃</td>
                            <td class="border border-gray-300 px-4 py-2">骨料+潜在活性材料</td>
                        </tr>
                        <tr>
                            <td class="border border-gray-300 px-4 py-2">矿渣粉</td>
                            <td class="border border-gray-300 px-4 py-2">CaO、SiO₂、Al₂O₃</td>
                            <td class="border border-gray-300 px-4 py-2">主要胶凝组分</td>
                        </tr>
                        <tr>
                            <td class="border border-gray-300 px-4 py-2">水泥熟料</td>
                            <td class="border border-gray-300 px-4 py-2">C₃S、C₂S</td>
                            <td class="border border-gray-300 px-4 py-2">早期强度+碱激发</td>
                        </tr>
                        <tr>
                            <td class="border border-gray-300 px-4 py-2">石膏</td>
                            <td class="border border-gray-300 px-4 py-2">CaSO₄·2H₂O</td>
                            <td class="border border-gray-300 px-4 py-2">硫酸盐激发+微膨胀</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="chapter-section">
                <h3 class="text-xl font-bold text-gray-900 mb-4">3.6 矿山充填现场配比调整</h3>
                <p class="text-gray-700 mb-4 leading-relaxed">
                    实验室优化配比需要根据现场条件进行修正：
                </p>
                <ul class="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li><strong>骨料特性变化：</strong>现场尾矿粒度、含水率波动时，需调整水胶比和减水剂掺量</li>
                    <li><strong>水质影响：</strong>高氯离子或硫酸盐含量的充填用水需调整胶凝材料配比</li>
                    <li><strong>温度修正：</strong>低温环境（<10°C）需提高水泥掺量或添加早强剂</li>
                    <li><strong>输送距离：</strong>长距离输送（>2000m）需提高料浆稳定性，添加增稠剂</li>
                </ul>
            </div>
        `,
        formulas: [
            {
                name: "正交试验极差",
                latex: "R_j = \\max_{1\\leq i\\leq n}\\bar{K}_{ij} - \\min_{1\\leq i\\leq n}\\bar{K}_{ij}",
                desc: "其中R_j为第j个因素的极差，K̄_ij为第j个因素第i个水平下的试验指标平均值。R值越大，该因素对指标的影响越显著。"
            },
            {
                name: "胶砂试块抗压强度平均值",
                latex: "\\bar{f} = \\frac{1}{n}\\sum_{i=1}^{n} f_i",
                desc: "其中f_i为第i个试件的抗压强度测定值，n为试件数量（通常n=3）。当3个测定值中有1个超出平均值的±10%时，应剔除该值后重新计算。"
            },
            {
                name: "水胶比与需水量关系",
                latex: "m_w = (m_c + m_s + m_f) \\times \\frac{w}{b}",
                desc: "其中m_w为用水量，m_c、m_s、m_f分别为水泥、矿渣、粉煤灰的质量，w/b为水胶比。该公式用于根据配比计算料浆配制用水量。"
            }
        ],
        imgUrl: "./assets/images/配比设计方法.jpg"
    },
    
    // ==========================================
    // 章节4：性能测试与评价
    // ==========================================
    {
        id: "chapter-4",
        title: "性能测试与评价",
        content: `
            <div class="chapter-section">
                <h3 class="text-xl font-bold text-gray-900 mb-4">4.1 相关规范标准</h3>
                <p class="text-gray-700 mb-4 leading-relaxed">
                    铁尾矿基胶结充填体性能测试应遵循以下国家标准和行业规范：
                </p>
                <ul class="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li><strong>GB/T 39489-2020《全尾砂膏体充填技术规范》</strong>：规定了全尾砂膏体充填的材料要求、配合比设计、充填工艺等技术要求</li>
                    <li><strong>GB/T 50081-2019《混凝土物理力学性能试验方法标准》</strong>：规定了抗压强度、劈裂抗拉强度等试验方法</li>
                    <li><strong>GB/T 50082-2009《普通混凝土长期性能和耐久性能试验方法标准》</strong>：规定了抗冻、抗渗等耐久性试验方法</li>
                    <li><strong>JGJ/T 70-2009《建筑砂浆基本性能试验方法标准》</strong>：适用于充填料浆工作性测试</li>
                </ul>
            </div>
            
            <div class="chapter-section">
                <h3 class="text-xl font-bold text-gray-900 mb-4">4.2 工作性能测试</h3>
                <h4 class="text-lg font-semibold text-gray-800 mb-2">（1）坍落度试验</h4>
                <p class="text-gray-700 mb-4 leading-relaxed">
                    使用标准坍落度筒（上口直径100mm，下口直径200mm，高度300mm）测试料浆流动性。将料浆分层装入筒内，每层插捣25次，垂直提起坍落度筒，测量料浆坍落高度。
                </p>
                <div class="info-box bg-blue-50 p-4 rounded-lg mb-4">
                    <p class="text-sm text-gray-700"><strong>评价标准：</strong>膏体充填料浆坍落度应≥180mm；坍落度<150mm时，料浆过于粘稠，难以泵送；坍落度>250mm时，料浆易离析泌水。</p>
                </div>
                
                <h4 class="text-lg font-semibold text-gray-800 mb-2">（2）流动度试验</h4>
                <p class="text-gray-700 mb-4 leading-relaxed">
                    使用截锥圆模（上口直径50mm，下口直径100mm，高度150mm）测定料浆扩展度。提起圆模后，测量料浆扩展直径，取两个垂直方向的平均值。
                </p>
                
                <h4 class="text-lg font-semibold text-gray-800 mb-2">（3）和易性评价</h4>
                <p class="text-gray-700 mb-4 leading-relaxed">
                    和易性包括流动性、粘聚性和保水性三方面。良好的充填料浆应：① 能自流平填充模具；② 不分层、不离析；③ 表面无泌水、无浮浆。
                </p>
            </div>
            
            <div class="chapter-section">
                <h3 class="text-xl font-bold text-gray-900 mb-4">4.3 力学性能测试</h3>
                <h4 class="text-lg font-semibold text-gray-800 mb-2">（1）无侧限抗压强度试验</h4>
                <p class="text-gray-700 mb-4 leading-relaxed">
                    采用70.7mm×70.7mm×70.7mm立方体试件，标准养护至规定龄期（3d、7d、28d），使用压力试验机以0.5-1.0MPa/s的速率加载至破坏。
                </p>
                <p class="text-gray-700 mb-4 leading-relaxed">
                    <strong>数据处理：</strong>3个试件测定值的算术平均值作为试验结果。若最大值或最小值与中间值之差超过中间值的15%，则取中间值作为试验结果。
                </p>
                
                <h4 class="text-lg font-semibold text-gray-800 mb-2">（2）霍普金森压杆试验（SHPB）</h4>
                <p class="text-gray-700 mb-4 leading-relaxed">
                    分离式霍普金森压杆试验用于测定充填体在冲击荷载下的动态力学性能。通过测量入射波、反射波和透射波，计算试件的应力、应变和应变率。
                </p>
            </div>
            
            <div class="chapter-section">
                <h3 class="text-xl font-bold text-gray-900 mb-4">4.4 耐久性能测试</h3>
                <h4 class="text-lg font-semibold text-gray-800 mb-2">（1）冻融循环试验</h4>
                <p class="text-gray-700 mb-4 leading-relaxed">
                    按照GB/T 50082规定，试件在-18±2°C冻结4h，然后在20±2°C水中融化4h，为一个冻融循环。每25次循环测试一次质量和抗压强度。
                </p>
                <p class="text-gray-700 mb-4 leading-relaxed">
                    <strong>评价指标：</strong>质量损失率≤5%，强度损失率≤25%为合格。
                </p>
                
                <h4 class="text-lg font-semibold text-gray-800 mb-2">（2）长期水浸试验</h4>
                <p class="text-gray-700 mb-4 leading-relaxed">
                    将试件完全浸入常温水中，定期（7d、14d、28d、56d、90d）取出测试质量和强度，评价充填体的水化稳定性和长期强度发展。
                </p>
                
                <h4 class="text-lg font-semibold text-gray-800 mb-2">（3）饱和吸水率测试</h4>
                <p class="text-gray-700 mb-4 leading-relaxed">
                    试件在105±5°C烘干至恒重，然后在常温水中浸泡48h至饱和，测量质量变化计算吸水率。
                </p>
            </div>
            
            <div class="chapter-section">
                <h3 class="text-xl font-bold text-gray-900 mb-4">4.5 微观性能测试</h3>
                <table class="w-full border-collapse border border-gray-300 mb-4">
                    <thead>
                        <tr class="bg-gray-100">
                            <th class="border border-gray-300 px-4 py-2">测试方法</th>
                            <th class="border border-gray-300 px-4 py-2">测试内容</th>
                            <th class="border border-gray-300 px-4 py-2">结果解读</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="border border-gray-300 px-4 py-2">XRD分析</td>
                            <td class="border border-gray-300 px-4 py-2">矿物相组成</td>
                            <td class="border border-gray-300 px-4 py-2">识别水化产物（C-S-H、AFt、CH等）</td>
                        </tr>
                        <tr>
                            <td class="border border-gray-300 px-4 py-2">SEM观察</td>
                            <td class="border border-gray-300 px-4 py-2">微观形貌</td>
                            <td class="border border-gray-300 px-4 py-2">观察水化产物形态、孔隙结构</td>
                        </tr>
                        <tr>
                            <td class="border border-gray-300 px-4 py-2">激光粒度分析</td>
                            <td class="border border-gray-300 px-4 py-2">粒度分布</td>
                            <td class="border border-gray-300 px-4 py-2">评价骨料级配、比表面积</td>
                        </tr>
                        <tr>
                            <td class="border border-gray-300 px-4 py-2">TG-DSC分析</td>
                            <td class="border border-gray-300 px-4 py-2">热稳定性</td>
                            <td class="border border-gray-300 px-4 py-2">定量分析C-S-H、CH含量</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="chapter-section">
                <h3 class="text-xl font-bold text-gray-900 mb-4">4.6 充填体性能综合评价体系</h3>
                <p class="text-gray-700 mb-4 leading-relaxed">
                    矿山充填工程对胶结充填体的性能要求应综合考虑以下指标：
                </p>
                <table class="w-full border-collapse border border-gray-300 mb-4">
                    <thead>
                        <tr class="bg-gray-100">
                            <th class="border border-gray-300 px-4 py-2">性能类别</th>
                            <th class="border border-gray-300 px-4 py-2">一级指标</th>
                            <th class="border border-gray-300 px-4 py-2">二级指标</th>
                            <th class="border border-gray-300 px-4 py-2">合格标准</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="border border-gray-300 px-4 py-2" rowspan="2">强度性能</td>
                            <td class="border border-gray-300 px-4 py-2">早期强度</td>
                            <td class="border border-gray-300 px-4 py-2">3d抗压强度</td>
                            <td class="border border-gray-300 px-4 py-2">≥0.5MPa</td>
                        </tr>
                        <tr>
                            <td class="border border-gray-300 px-4 py-2">后期强度</td>
                            <td class="border border-gray-300 px-4 py-2">28d抗压强度</td>
                            <td class="border border-gray-300 px-4 py-2">≥设计值</td>
                        </tr>
                        <tr>
                            <td class="border border-gray-300 px-4 py-2" rowspan="2">工作性能</td>
                            <td class="border border-gray-300 px-4 py-2">流动性</td>
                            <td class="border border-gray-300 px-4 py-2">坍落度</td>
                            <td class="border border-gray-300 px-4 py-2">180-220mm</td>
                        </tr>
                        <tr>
                            <td class="border border-gray-300 px-4 py-2">稳定性</td>
                            <td class="border border-gray-300 px-4 py-2">泌水率</td>
                            <td class="border border-gray-300 px-4 py-2">≤5%</td>
                        </tr>
                        <tr>
                            <td class="border border-gray-300 px-4 py-2" rowspan="2">耐久性能</td>
                            <td class="border border-gray-300 px-4 py-2">抗冻性</td>
                            <td class="border border-gray-300 px-4 py-2">50次冻融强度损失</td>
                            <td class="border border-gray-300 px-4 py-2">≤25%</td>
                        </tr>
                        <tr>
                            <td class="border border-gray-300 px-4 py-2">水稳定性</td>
                            <td class="border border-gray-300 px-4 py-2">饱和吸水率</td>
                            <td class="border border-gray-300 px-4 py-2">≤15%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        `,
        formulas: [
            {
                name: "质量损失率",
                latex: "\\Delta m = \\frac{m_0 - m_n}{m_0} \\times 100\\%",
                desc: "其中m₀为冻融前试件质量，m_n为n次冻融循环后试件质量。质量损失率反映冻融作用下试件表面剥蚀程度。"
            },
            {
                name: "强度损失率",
                latex: "\\Delta f = \\frac{f_0 - f_n}{f_0} \\times 100\\%",
                desc: "其中f₀为冻融前抗压强度，f_n为n次冻融循环后抗压强度。强度损失率反映内部结构损伤累积程度。"
            },
            {
                name: "饱和吸水率",
                latex: "W_s = \\frac{m_s - m_d}{m_d} \\times 100\\%",
                desc: "其中m_s为饱和面干质量，m_d为烘干质量。饱和吸水率反映充填体的孔隙率和连通孔隙比例。"
            },
            {
                name: "SHPB应力计算",
                latex: "\\sigma(t) = \\frac{A_b E_b}{A_s}[\\varepsilon_i(t) + \\varepsilon_r(t)]",
                desc: "其中A_b、E_b为压杆截面积和弹性模量，A_s为试件截面积，ε_i、ε_r分别为入射波和反射波应变。"
            }
        ],
        imgUrl: "./assets/images/充填体性能测试与评价.jpg"
    },
    
    // ==========================================
    // 章节5：工程应用与展望
    // ==========================================
    {
        id: "chapter-5",
        title: "工程应用与展望",
        content: `
            <div class="chapter-section">
                <h3 class="text-xl font-bold text-gray-900 mb-4">5.1 核心应用场景</h3>
                <p class="text-gray-700 mb-4 leading-relaxed">
                    铁尾矿基胶结充填材料在矿山工程中具有广泛的应用场景：
                </p>
                <ul class="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li><strong>地下矿山采空区充填：</strong>支撑围岩、控制地压、防止地表塌陷，是铁尾矿充填最主要的应用场景</li>
                    <li><strong>露天坑回填：</strong>利用铁尾矿回填废弃露天采坑，恢复土地利用功能</li>
                    <li><strong>公路路基回填：</strong>经改性处理后的铁尾矿可用于低等级公路路基填筑</li>
                    <li><strong>矿井巷道支护：</strong>制备喷射充填材料用于巷道支护和冒落区充填</li>
                    <li><strong>尾矿库闭库：</strong>利用铁尾矿充填退役尾矿库，实现库容再利用</li>
                </ul>
            </div>
            
            <div class="chapter-section">
                <h3 class="text-xl font-bold text-gray-900 mb-4">5.2 产业现状与工程案例</h3>
                <p class="text-gray-700 mb-4 leading-relaxed">
                    我国铁尾矿年排放量超过<span class="highlight-number">15亿吨</span>，但综合利用率不足<span class="highlight-number">20%</span>。铁尾矿基充填材料的规模化应用仍处于起步阶段，但发展迅速。
                </p>
                <div class="info-box bg-green-50 p-4 rounded-lg mb-4">
                    <p class="text-sm text-gray-700"><strong>典型工程案例：</strong></p>
                    <ul class="list-disc list-inside text-sm text-gray-700 mt-2 space-y-1">
                        <li>鞍钢集团：年消纳铁尾矿500万吨用于矿山充填</li>
                        <li>首钢矿业：全尾砂胶结充填技术覆盖全部地下矿山</li>
                        <li>太钢集团：铁尾矿-矿渣复合胶凝材料工业化应用</li>
                    </ul>
                </div>
            </div>
            
            <div class="chapter-section">
                <h3 class="text-xl font-bold text-gray-900 mb-4">5.3 现存技术瓶颈</h3>
                <table class="w-full border-collapse border border-gray-300 mb-4">
                    <thead>
                        <tr class="bg-gray-100">
                            <th class="border border-gray-300 px-4 py-2">技术瓶颈</th>
                            <th class="border border-gray-300 px-4 py-2">具体问题</th>
                            <th class="border border-gray-300 px-4 py-2">影响程度</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td class="border border-gray-300 px-4 py-2">活性激发能耗高</td>
                            <td class="border border-gray-300 px-4 py-2">机械粉磨、热活化能耗大，经济性差</td>
                            <td class="border border-gray-300 px-4 py-2">高</td>
                        </tr>
                        <tr>
                            <td class="border border-gray-300 px-4 py-2">低温性能劣化</td>
                            <td class="border border-gray-300 px-4 py-2">严寒地区（<-20°C）充填体强度损失严重</td>
                            <td class="border border-gray-300 px-4 py-2">高</td>
                        </tr>
                        <tr>
                            <td class="border border-gray-300 px-4 py-2">超细尾矿利用难</td>
                            <td class="border border-gray-300 px-4 py-2">-200目含量>80%的尾矿充填性能差</td>
                            <td class="border border-gray-300 px-4 py-2">中</td>
                        </tr>
                        <tr>
                            <td class="border border-gray-300 px-4 py-2">成本控制困难</td>
                            <td class="border border-gray-300 px-4 py-2">水泥用量高，与尾矿堆存成本相比优势不明显</td>
                            <td class="border border-gray-300 px-4 py-2">中</td>
                        </tr>
                    </tbody>
                </table>
            </div>
            
            <div class="chapter-section">
                <h3 class="text-xl font-bold text-gray-900 mb-4">5.4 技术发展趋势</h3>
                <ul class="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li><strong>低能耗机械-化学协同活化技术：</strong>开发高效粉磨设备和复合激发剂，降低活化能耗30%以上</li>
                    <li><strong>多固废协同胶凝体系：</strong>利用铁尾矿、矿渣、钢渣、粉煤灰等多种固废的协同效应，开发无熟料胶凝材料</li>
                    <li><strong>智能化配比设计：</strong>基于机器学习的配比优化算法，实现性能预测和自动配比设计</li>
                    <li><strong>低碳无熟料胶凝材料：</strong>开发以工业废渣为主体的新型胶凝材料，碳排放降低80%以上</li>
                    <li><strong>长期性能与环境安全评价：</strong>建立充填体百年服役性能预测模型和环境风险评估体系</li>
                </ul>
            </div>
            
            <div class="chapter-section">
                <h3 class="text-xl font-bold text-gray-900 mb-4">5.5 环保与经济效益分析</h3>
                <h4 class="text-lg font-semibold text-gray-800 mb-2">环境效益：</h4>
                <ul class="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>固废消纳：每吨充填材料可消纳0.7-0.9吨铁尾矿</li>
                    <li>尾矿库减排：减少尾矿库建设需求，降低溃坝风险</li>
                    <li>碳减排：替代水泥可降低CO₂排放300-400kg/t</li>
                    <li>土地恢复：充填采空区后可恢复地表土地利用</li>
                </ul>
                
                <h4 class="text-lg font-semibold text-gray-800 mb-2">经济效益：</h4>
                <ul class="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>充填成本降低：铁尾矿基胶凝材料成本比纯水泥降低20-40%</li>
                    <li>尾矿处置费用节省：减少尾矿库建设和运营费用</li>
                    <li>资源回收：部分铁尾矿中可回收铁矿物</li>
                </ul>
            </div>
            
            <div class="chapter-section">
                <h3 class="text-xl font-bold text-gray-900 mb-4">5.6 行业政策与标准体系</h3>
                <p class="text-gray-700 mb-4 leading-relaxed">
                    <strong>国家政策支持：</strong>
                </p>
                <ul class="list-disc list-inside text-gray-700 mb-4 space-y-2">
                    <li>《"十四五"原材料工业发展规划》：推进尾矿等大宗固废综合利用</li>
                    <li>《关于"十四五"大宗固体废弃物综合利用的指导意见》：到2025年新增大宗固废综合利用率达到60%</li>
                    <li>《绿色矿山建设评价指标》：将尾矿充填利用率纳入绿色矿山评价</li>
                    <li>《矿山生态环境保护与恢复治理方案编制规范》：鼓励矿山充填开采</li>
                </ul>
                <p class="text-gray-700 mb-4 leading-relaxed">
                    <strong>标准体系建设：</strong>目前已形成包括GB/T 39489-2020《全尾砂膏体充填技术规范》在内的系列标准，涵盖设计、施工、检测、评价全流程。
                </p>
            </div>
        `,
        formulas: [
            {
                name: "铁尾矿消纳率",
                latex: "\\eta = \\frac{M_{tailings}}{M_{total}} \\times 100\\%",
                desc: "其中M_tailings为配方中铁尾矿质量，M_total为充填材料总质量。消纳率越高，固废利用效益越好，一般要求η>70%。"
            },
            {
                name: "充填材料单位成本",
                latex: "C = \\sum_{i=1}^{n} c_i \\cdot m_i + C_{process}",
                desc: "其中c_i为第i种原材料单价，m_i为单位充填体中第i种材料用量，C_process为加工处理成本（元/m³）。"
            },
            {
                name: "胶凝材料碳排放减量",
                latex: "\\Delta CO_2 = (E_{cement} - E_{blend}) \\times M_{binder}",
                desc: "其中E_cement为纯水泥碳排放因子（约0.9kg CO₂/kg），E_blend为复合胶凝材料碳排放因子，M_binder为胶凝材料用量。"
            }
        ],
        imgUrl: "./assets/images/充填工程应用与展望.jpg?v=2"
    }
];

// ==========================================
// 数据导出
// ==========================================
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { STUDY_CHAPTERS };
}
