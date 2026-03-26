"""
Manim动画脚本 - 高掺量铁尾矿基全固废胶凝材料制备实验流程
完整展示6步实验流程
"""

from manim import *
import numpy as np

# 定义颜色常量
BROWN = "#8B4513"
GRAY_B = "#BDBDBD"
BLUE_GRAY = "#607D8B"
BLUE_E = "#1E88E5"
BLUE_D = "#1565C0"
BLUE_C = "#0D47A1"
BLUE_B = "#0A3D8F"

class ExperimentProcess(Scene):
    def construct(self):
        # 设置背景
        self.camera.background_color = "#1a1a2e"
        
        # 标题 - 居中对齐
        title = Text(
            "高掺量铁尾矿基全固废胶凝材料制备实验",
            font_size=32,
            color=WHITE
        ).move_to(UP * 2)

        subtitle = Text(
            "完整6步实验流程",
            font_size=20,
            color=BLUE_B
        ).next_to(title, DOWN, buff=0.2)
        
        self.play(Write(title), Write(subtitle))
        self.wait(1)
        
        # 淡出标题，为步骤展示腾出空间
        self.play(FadeOut(title), FadeOut(subtitle))
        
        # 步骤1: 铁尾矿机械活化粉磨
        self.show_step1()
        
        # 步骤2: 原材料称量与配料
        self.show_step2()
        
        # 步骤3: 胶凝材料混料与浆体制备
        self.show_step3()
        
        # 步骤4: 试模浇筑与振捣成型
        self.show_step4()
        
        # 步骤5: 标准养护与终止水化
        self.show_step5()
        
        # 步骤6: 性能测试与微观表征
        self.show_step6()
        
        # 总结
        self.show_summary()
    
    def show_step1(self):
        """步骤1: 铁尾矿机械活化粉磨"""
        step_title = Text("步骤1: 铁尾矿机械活化粉磨", font_size=24, color=YELLOW)
        step_title.to_edge(UP, buff=0.5)
        
        # 创建球磨机 - 居中
        mill_body = Circle(radius=1.5, color=GRAY, fill_opacity=0.3)
        
        # 旋转轴
        axis = Line(UP * 1.8, DOWN * 1.8, color=WHITE)
        
        # 铁尾矿颗粒 - 确保在容器内部（半径1.5的圆内）
        particles = VGroup()
        for _ in range(20):
            # 使用极坐标确保在圆内，考虑颗粒半径0.08
            max_r = 1.5 - 0.08 - 0.1  # 容器半径 - 颗粒半径 - 边距
            r = np.random.uniform(0, max_r * 0.8)  # 再留一些安全距离
            theta = np.random.uniform(0, 2 * PI)
            x = r * np.cos(theta)
            y = r * np.sin(theta)
            particle = Dot(radius=0.08, color=BROWN).move_to(
                mill_body.get_center() + np.array([x, y, 0])
            )
            particles.add(particle)
        
        # 磨球 - 确保在容器内部
        balls = VGroup()
        for _ in range(8):
            # 使用极坐标确保在圆内，磨球半径0.15
            max_r = 1.5 - 0.15 - 0.1  # 容器半径 - 磨球半径 - 边距
            r = np.random.uniform(0, max_r * 0.7)  # 磨球较大，留更多安全距离
            theta = np.random.uniform(0, 2 * PI)
            x = r * np.cos(theta)
            y = r * np.sin(theta)
            ball = Circle(radius=0.15, color=GRAY_B, fill_opacity=0.8).move_to(
                mill_body.get_center() + np.array([x, y, 0])
            )
            balls.add(ball)
        
        description = Text(
            "铁尾矿经过机械粉磨，粒径减小，活性提高",
            font_size=22,
            color=WHITE
        ).to_edge(DOWN, buff=0.8)
        
        self.play(Write(step_title))
        self.play(Create(mill_body), Create(axis))
        self.play(FadeIn(particles), FadeIn(balls))
        self.play(Write(description))

        # 动画：球磨机旋转 + 震动混合效果
        # 第一阶段：球磨机旋转（材料在内部跟随运动）
        # 使用较小的旋转角度，避免材料甩出
        self.play(
            Rotate(mill_body, angle=PI/2, rate_func=linear),
            Rotate(particles, angle=PI/2, rate_func=linear),
            Rotate(balls, angle=PI/2, rate_func=linear),
            run_time=1.5
        )

        # 第二阶段：材料混合效果 - 颗粒和磨球在容器内重新分布
        mixed_particles = VGroup()
        for _ in range(20):
            # 严格限制在容器内部
            max_r = 1.5 - 0.08 - 0.15  # 容器半径 - 颗粒半径 - 安全边距
            r = np.random.uniform(0, max_r * 0.8)
            theta = np.random.uniform(0, 2 * PI)
            x = r * np.cos(theta)
            y = r * np.sin(theta)
            particle = Dot(radius=0.08, color=BROWN).move_to(
                mill_body.get_center() + np.array([x, y, 0])
            )
            mixed_particles.add(particle)

        mixed_balls = VGroup()
        for _ in range(8):
            # 严格限制在容器内部
            max_r = 1.5 - 0.15 - 0.15  # 容器半径 - 磨球半径 - 安全边距
            r = np.random.uniform(0, max_r * 0.7)
            theta = np.random.uniform(0, 2 * PI)
            x = r * np.cos(theta)
            y = r * np.sin(theta)
            ball = Circle(radius=0.15, color=GRAY_B, fill_opacity=0.8).move_to(
                mill_body.get_center() + np.array([x, y, 0])
            )
            mixed_balls.add(ball)

        # 混合动画：材料重新分布，模拟震动混合效果
        self.play(
            mill_body.animate.shift(RIGHT * 0.05),
            run_time=0.1
        )
        self.play(
            mill_body.animate.shift(LEFT * 0.1),
            run_time=0.1
        )
        self.play(
            mill_body.animate.shift(RIGHT * 0.05),
            Transform(particles, mixed_particles),
            Transform(balls, mixed_balls),
            run_time=1.5
        )

        self.wait(1)
        self.clear()
    
    def show_step2(self):
        """步骤2: 原材料称量与配料"""
        step_title = Text("步骤2: 原材料称量与配料", font_size=24, color=YELLOW)
        step_title.to_edge(UP, buff=0.5)
        
        # 电子秤 - 放在下方，留出足够空间
        scale_base = Rectangle(height=0.3, width=2, color=GRAY, fill_opacity=0.5)
        scale_base.shift(DOWN * 2.5)
        
        scale_display = Rectangle(height=0.5, width=1.2, color=BLACK, fill_opacity=0.8)
        scale_display.next_to(scale_base, UP, buff=0.1)
        
        # 天平显示器初始显示0
        display_text = Text("0g", font_size=18, color=GREEN)
        display_text.move_to(scale_display.get_center())
        
        # 定义5种材料：[名称, 颜色, 掺量%, 质量g, 水平位置] - 间距加大，避免重叠
        materials_data = [
            ("铁尾矿", BROWN, "40.0%", "180.0g", LEFT * 5),
            ("矿渣", GRAY, "35.0%", "157.5g", LEFT * 2.5),
            ("钢渣", "#708090", "15.0%", "67.5g", ORIGIN),
            ("脱硫石膏", "#F5F5DC", "10.0%", "45.0g", RIGHT * 2.5),
            ("NaOH", "#FF6B6B", "0.5%", "2.3g", RIGHT * 5),
        ]
        
        # 创建材料容器和标签，记录初始位置
        material_groups = []
        initial_positions = []
        
        # 计算显示器顶部位置（材料称量时的目标位置）
        display_top = scale_display.get_top()
        
        for name, color, percent, mass, pos in materials_data:
            # 容器
            container = Rectangle(height=0.8, width=1.2, color=color, fill_opacity=0.6)
            # 放在上方，初始位置
            container_pos = pos + UP * 2.5
            container.shift(container_pos)
            
            # 标签（在容器上方）
            label = Text(name, font_size=11, color=WHITE)
            label.next_to(container, UP, buff=0.1)
            
            # 将容器和标签组合
            group = VGroup(container, label)
            material_groups.append(group)
            initial_positions.append(container_pos)
        
        # 将所有材料组合成一个VGroup用于显示
        all_materials = VGroup(*material_groups)
        
        description = Text(
            "精确称量5种原材料：铁尾矿、矿渣、钢渣、脱硫石膏、NaOH",
            font_size=16,
            color=WHITE
        ).to_edge(DOWN, buff=0.5)
        
        self.play(Write(step_title))
        self.play(Create(scale_base), Create(scale_display), Write(display_text))
        self.play(Create(all_materials))
        self.play(Write(description))
        
        # 动画：称量过程 - 依次将材料放到天平上，然后回归原位
        masses = ["180.0g", "157.5g", "67.5g", "45.0g", "2.3g"]
        
        for i, (group, mass, initial_pos) in enumerate(zip(material_groups, masses, initial_positions)):
            # 创建新的显示文本
            new_display = Text(mass, font_size=18, color=GREEN)
            new_display.move_to(scale_display.get_center())
            
            # 材料移动到天平上（放在显示屏上方，底部与显示器顶部相切）
            # 计算位置：材料底部刚好接触显示器顶部
            # 显示器顶部 + 材料高度的一半（因为move_to是移动到中心点）
            material_target_y = display_top[1] + 0.4  # 0.4是容器高度0.8的一半
            scale_center = np.array([scale_base.get_center()[0], material_target_y, 0])
            
            self.play(
                group.animate.move_to(scale_center),
                Transform(display_text, new_display),
                run_time=1
            )
            self.wait(0.5)
            
            # 材料回归原位（不是飞走）
            self.play(
                group.animate.shift(initial_pos - scale_center),
                run_time=0.8
            )
            
            # 重置显示器为0（除了最后一个）
            if i < len(masses) - 1:
                zero_display = Text("0g", font_size=18, color=GREEN)
                zero_display.move_to(scale_display.get_center())
                self.play(Transform(display_text, zero_display), run_time=0.3)
        
        self.wait(1)
        self.clear()
    
    def show_step3(self):
        """步骤3: 胶凝材料混料与浆体制备"""
        step_title = Text("步骤3: 胶凝材料混料与浆体制备", font_size=24, color=YELLOW)
        step_title.to_edge(UP, buff=0.5)
        
        # 浆体 - 浅棕色，较大的圆柱体代表材料团
        slurry_light = "#D2B48C"  # 浅棕色
        slurry_dark = "#8B4513"   # 深棕色
        # 使用较大的圆柱体作为材料团，半径0.8，高度1.0，在容器内做圆周运动
        # 容器半径1.5，材料团半径0.8，圆周运动半径0.6，确保不会超出容器
        slurry = Cylinder(radius=0.8, height=1.0, color=slurry_light, fill_opacity=0.9)
        # 初始位置：在容器内部偏右的位置（圆周运动的起始点）
        slurry.shift(RIGHT * 0.6 + DOWN * 0.2)
        
        # 搅拌机容器 - 使用轮廓而不是填充，避免遮挡浆体
        mixer_body = Cylinder(radius=1.5, height=2, color=GRAY, fill_opacity=0.1, stroke_width=3)
        
        # 搅拌桨
        blade = Cross(scale_factor=0.5, color=WHITE)
        
        description = Text(
            "将原材料混合均匀，搅拌制备成均匀浆体",
            font_size=22,
            color=WHITE
        ).to_edge(DOWN, buff=0.8)
        
        self.play(Write(step_title))
        # 先显示浆体，再显示搅拌机轮廓
        self.play(FadeIn(slurry))
        self.play(Create(mixer_body), Create(blade))
        self.play(Write(description))
        
        # 动画：搅拌过程
        # 搅拌桨旋转，浆体绕着容器内部做圆周运动
        # 圆周运动半径约0.8，与容器内壁保持一定距离（容器半径1.5）
        
        # 定义圆周路径上的关键点（8个点构成一圈）
        # 调整圆周运动半径为0.5，确保材料团（半径0.8）不会超出容器（半径1.5）
        radius = 0.5
        y_offset = -0.2
        positions = []
        for i in range(8):
            angle = i * PI / 4  # 0, 45, 90, 135, 180, 225, 270, 315度
            x = radius * np.cos(angle)
            y = radius * np.sin(angle) + y_offset
            positions.append(np.array([x, y, 0]))
        
        # 颜色过渡：浅棕 -> 中棕 -> 深棕
        colors = ["#D2B48C", "#C19A6B", "#A0522D", "#8B4513"]
        
        # 动画：搅拌桨旋转同时，浆体绕容器内部做圆周运动
        # 搅拌桨转2圈（4π），浆体也同时转2圈
        
        # 第一圈：搅拌桨旋转，浆体绕半圈
        self.play(
            Rotate(blade, angle=2*PI, rate_func=linear),
            slurry.animate.move_to(positions[4]).set_color(colors[1]),
            run_time=1.5
        )
        
        # 第二圈：继续旋转，浆体绕完一圈回到起点
        self.play(
            Rotate(blade, angle=2*PI, rate_func=linear),
            slurry.animate.move_to(positions[0]).set_color(colors[2]),
            run_time=1.5
        )
        
        self.wait(1)
        self.clear()
    
    def show_step4(self):
        """步骤4: 试模浇筑与震动成型"""
        step_title = Text("步骤4: 试模浇筑与震动成型", font_size=24, color=YELLOW)
        step_title.to_edge(UP, buff=0.5)
        
        # 试模 - 居中
        mold = Rectangle(height=2.5, width=1.5, color=GRAY, fill_opacity=0.2)
        
        mold_top = Line(
            mold.get_corner(UL) + UP * 0.1,
            mold.get_corner(UR) + UP * 0.1,
            color=GRAY
        )
        
        # 浆体倒入 - 深棕色
        slurry_stream = Rectangle(height=1.5, width=0.3, color="#8B4513", fill_opacity=0.8)
        slurry_stream.shift(UP * 2)
        
        description = Text(
            "将浆体浇筑入试模，震动密实排除气泡",
            font_size=22,
            color=WHITE
        ).to_edge(DOWN, buff=0.8)
        
        self.play(Write(step_title))
        self.play(Create(mold), Create(mold_top))
        self.play(Create(slurry_stream))
        self.play(slurry_stream.animate.move_to(mold.get_center()), run_time=2)
        self.play(FadeOut(slurry_stream))
        
        # 填充的浆体 - 深棕色
        filled_slurry = Rectangle(height=2, width=1.3, color="#8B4513", fill_opacity=0.7)
        filled_slurry.move_to(mold.get_center())
        self.play(FadeIn(filled_slurry))
        
        self.play(Write(description))
        
        # 动画：试模震动2秒
        self.play(
            mold.animate.shift(RIGHT * 0.05),
            filled_slurry.animate.shift(RIGHT * 0.05),
            mold_top.animate.shift(RIGHT * 0.05),
            run_time=0.1
        )
        # 快速左右震动
        for _ in range(10):
            self.play(
                mold.animate.shift(LEFT * 0.1),
                filled_slurry.animate.shift(LEFT * 0.1),
                mold_top.animate.shift(LEFT * 0.1),
                run_time=0.1
            )
            self.play(
                mold.animate.shift(RIGHT * 0.1),
                filled_slurry.animate.shift(RIGHT * 0.1),
                mold_top.animate.shift(RIGHT * 0.1),
                run_time=0.1
            )
        # 回到中心
        self.play(
            mold.animate.shift(LEFT * 0.05),
            filled_slurry.animate.shift(LEFT * 0.05),
            mold_top.animate.shift(LEFT * 0.05),
            run_time=0.1
        )
        
        self.wait(1)
        self.clear()
    
    def show_step5(self):
        """步骤5: 标准养护与终止水化"""
        step_title = Text("步骤5: 标准养护与终止水化", font_size=24, color=YELLOW)
        step_title.to_edge(UP, buff=0.5)
        
        # 养护箱 - 居中
        chamber = Rectangle(height=3, width=4, color=GRAY, fill_opacity=0.2)
        
        chamber_door = Line(
            chamber.get_corner(UL),
            chamber.get_corner(DL),
            color=WHITE
        )
        
        # 试件 - 深棕色
        specimen = Rectangle(height=1.5, width=0.8, color="#8B4513", fill_opacity=0.8)
        specimen.move_to(chamber.get_center())
        
        # 温湿度指示 - 居中排列
        temp_label = Text("温度: 20±2°C", font_size=16, color=RED)
        temp_label.shift(LEFT * 2.5 + UP * 2)
        
        humidity_label = Text("湿度: ≥95%", font_size=16, color=BLUE)
        humidity_label.shift(RIGHT * 2.5 + UP * 2)
        
        # 龄期指示
        age_label = Text("养护龄期: 3d → 7d → 28d", font_size=20, color=GREEN)
        age_label.to_edge(DOWN, buff=1.8)
        
        description = Text(
            "标准条件下养护，定期测试不同龄期的性能",
            font_size=22,
            color=WHITE
        ).to_edge(DOWN, buff=0.6)
        
        self.play(Write(step_title))
        self.play(Create(chamber), Create(chamber_door))
        self.play(FadeIn(specimen))
        self.play(Write(temp_label), Write(humidity_label))
        self.play(Write(description))
        
        # 动画：时间流逝
        self.play(Write(age_label))
        
        # 3d -> 颜色变化表示水化（保持深棕色系）
        specimen_3d = Rectangle(height=1.5, width=0.8, color="#A0522D", fill_opacity=0.9)
        specimen_3d.move_to(chamber.get_center())
        
        specimen_7d = Rectangle(height=1.5, width=0.8, color="#8B4513", fill_opacity=0.95)
        specimen_7d.move_to(chamber.get_center())
        
        specimen_28d = Rectangle(height=1.5, width=0.8, color="#654321", fill_opacity=1)
        specimen_28d.move_to(chamber.get_center())
        
        self.play(Transform(specimen, specimen_3d), run_time=1)
        self.wait(0.5)
        self.play(Transform(specimen, specimen_7d), run_time=1)
        self.wait(0.5)
        self.play(Transform(specimen, specimen_28d), run_time=1)
        
        self.wait(1)
        self.clear()
    
    def show_step6(self):
        """步骤6: 性能测试与微观表征 - 优化版：宏观-微观平滑过渡"""
        step_title = Text("步骤6: 性能测试与微观表征", font_size=24, color=YELLOW)
        step_title.to_edge(UP, buff=0.5)
        
        # ========== 1. 压力试验机 - 专业工业造型 ==========
        # 机身框架 - 浅灰色金属质感
        machine_frame = VGroup()
        
        # 底座 - 稳重的基础
        base_plate = Rectangle(height=0.6, width=2.2, color="#708090", fill_opacity=0.9)
        base_plate.shift(DOWN * 2 + LEFT * 2.5)
        
        # 立柱 - 双柱结构
        left_column = Rectangle(height=3.5, width=0.25, color="#A9A9A9", fill_opacity=0.85)
        left_column.next_to(base_plate, UP, buff=0).shift(LEFT * 0.8)
        
        right_column = Rectangle(height=3.5, width=0.25, color="#A9A9A9", fill_opacity=0.85)
        right_column.next_to(base_plate, UP, buff=0).shift(RIGHT * 0.8)
        
        # 顶部横梁
        top_beam = Rectangle(height=0.5, width=2.2, color="#708090", fill_opacity=0.9)
        top_beam.next_to(left_column, UP, buff=0).shift(RIGHT * 0.8)
        
        # 可移动压头 - 冷灰色金属压头
        press_head = Rectangle(height=0.5, width=0.9, color="#4A4A4A", fill_opacity=1)
        press_head.move_to(top_beam.get_center() + DOWN * 0.6)
        
        # 压头连接杆
        press_rod = Rectangle(height=0.8, width=0.2, color="#696969", fill_opacity=0.9)
        press_rod.next_to(press_head, UP, buff=0)
        
        machine_frame.add(base_plate, left_column, right_column, top_beam, press_rod, press_head)
        
        # 试件 - 高饱和度橙色（胶凝材料试样）
        test_specimen = Rectangle(height=0.8, width=0.5, color="#D2691E", fill_opacity=0.95)
        test_specimen.move_to(base_plate.get_center() + UP * 0.7)
        
        # 压力显示屏
        display_bg = Rectangle(height=0.6, width=1.2, color=BLACK, fill_opacity=0.9)
        display_bg.next_to(top_beam, RIGHT, buff=0.5)
        
        pressure_label = Text("压力: 0 kN", font_size=16, color=GREEN)
        pressure_label.move_to(display_bg.get_center())
        
        # ========== 2. SEM设备 - 专业工业造型（初始在屏幕右侧外）==========
        sem_group = VGroup()
        
        # SEM主机 - 浅灰色箱体（初始在右侧外，平移后进入）
        sem_body = Rectangle(height=1.8, width=1.2, color="#C0C0C0", fill_opacity=0.9)
        sem_body.shift(RIGHT * 6 + DOWN * 0.5)  # 在屏幕右侧外
        
        # SEM镜头/电子枪 - 圆柱形
        sem_lens = Cylinder(radius=0.25, height=0.8, color="#808080", fill_opacity=0.9)
        sem_lens.shift(RIGHT * 6 + UP * 1.2)
        
        # 样品台
        sample_stage = Rectangle(height=0.15, width=0.6, color="#2F4F4F", fill_opacity=1)
        sample_stage.move_to(sem_body.get_top() + UP * 0.3)
        
        # 控制面板
        control_panel = Rectangle(height=0.8, width=0.4, color="#4682B4", fill_opacity=0.7)
        control_panel.next_to(sem_body, RIGHT, buff=0.1)
        
        sem_group.add(sem_body, sem_lens, sample_stage, control_panel)
        
        sem_label = Text("SEM扫描电镜", font_size=14, color=WHITE)
        sem_label.next_to(sem_lens, UP, buff=0.2)
        
        description = Text(
            "宏观抗压测试 → 微观结构表征",
            font_size=22,
            color=WHITE
        ).to_edge(DOWN, buff=0.8)
        
        # ========== 动画开始 ==========
        self.play(Write(step_title))
        
        # 显示压力机
        self.play(Create(machine_frame), run_time=1.5)
        self.play(FadeIn(test_specimen))
        self.play(Create(display_bg), Write(pressure_label))
        self.play(Write(description))
        
        # ========== 压力测试动画 ==========
        new_pressure = Text("压力: 50 kN", font_size=16, color=GREEN)
        new_pressure.move_to(pressure_label.get_center())
        
        press_head_height = 0.5
        specimen_height = 0.8
        
        specimen_top = test_specimen.get_center()[1] + specimen_height / 2
        press_head_bottom = press_head.get_center()[1] - press_head_height / 2
        move_distance = press_head_bottom - specimen_top
        
        compressed_height = specimen_height * 0.85
        compression_amount = (specimen_height - compressed_height) / 2
        
        # 第一阶段：压头下压接触试件
        self.play(
            press_head.animate.shift(DOWN * abs(move_distance)),
            press_rod.animate.shift(DOWN * abs(move_distance)),
            Transform(pressure_label, new_pressure),
            run_time=1.5
        )
        
        # 第二阶段：压头继续下压，试件压缩
        self.play(
            press_head.animate.shift(DOWN * compression_amount),
            press_rod.animate.shift(DOWN * compression_amount),
            test_specimen.animate.scale(0.85),
            run_time=1.5
        )
        
        self.wait(0.5)
        
        # ========== 平滑过渡：取样动画 ==========
        # 从试件上"切取"一小块样品
        small_sample = Rectangle(height=0.25, width=0.2, color="#D2691E", fill_opacity=1)
        small_sample.move_to(test_specimen.get_top() + UP * 0.2)
        
        sample_label = Text("取样", font_size=12, color=YELLOW)
        sample_label.next_to(small_sample, UP, buff=0.1)
        
        self.play(FadeIn(small_sample), Write(sample_label))
        self.wait(0.5)
        
        # 样品移动到SEM设备 - 留在样品台上，不移动到显微图像上
        self.play(
            small_sample.animate.move_to(sample_stage.get_center() + UP * 0.15),
            FadeOut(sample_label),
            run_time=2
        )
        
        # 镜头平移：平滑运镜，一镜到底
        # 第一阶段：压力机向左移出屏幕
        self.play(
            machine_frame.animate.shift(LEFT * 8),
            test_specimen.animate.shift(LEFT * 8),
            display_bg.animate.shift(LEFT * 8),
            pressure_label.animate.shift(LEFT * 8),
            run_time=1.5
        )
        
        # 第二阶段：SEM设备从右侧进入屏幕（移到左边位置）
        self.play(
            sem_group.animate.shift(LEFT * 9),  # 从RIGHT*6移到LEFT*3左右
            sem_label.animate.shift(LEFT * 9),
            run_time=1.5
        )
        
        # 显示SEM设备标签
        self.play(Write(sem_label))
        
        # ========== SEM微观表征动画 ==========
        # 创建相机框架表示视野 - 居中显示
        camera_frame = Rectangle(height=2.5, width=3, color=WHITE, stroke_width=2)
        camera_frame.shift(RIGHT * 1.5)  # 居中偏右，不遮挡SEM
        
        # 电子束扫描线
        scan_line = Line(
            camera_frame.get_left() + UP * 1,
            camera_frame.get_right() + UP * 1,
            color=GREEN, stroke_width=2
        )
        
        sem_view_label = Text("SEM视野", font_size=14, color=GREEN)
        sem_view_label.next_to(camera_frame, UP)
        
        self.play(Create(camera_frame), Write(sem_view_label))
        
        # 微观结构组
        microstructure = VGroup()
        
        # 针状钙矾石 (AFt) - 深紫色针状晶体
        aft_crystals = VGroup()
        for i in range(8):
            # 针状晶体
            needle = Polygon(
                [-0.1, 0.3, 0],
                [0, 0.6, 0],
                [0.1, 0.3, 0],
                color="#4B0082", fill_opacity=0.8
            )
            # 居中显示，不遮挡SEM
            needle.shift(RIGHT * 1.5 + np.array([
                np.random.uniform(-1.2, 1.2),
                np.random.uniform(-0.8, 0.5),
                0
            ]))
            needle.rotate(np.random.uniform(0, PI))
            aft_crystals.add(needle)

        # 絮状C-S-H凝胶 - 浅蓝色絮状
        csh_gel = VGroup()
        for i in range(15):
            # 絮状结构
            fluff = Ellipse(width=0.15, height=0.1, color="#87CEEB", fill_opacity=0.6)
            fluff.shift(RIGHT * 1.5 + np.array([
                np.random.uniform(-1.3, 1.3),
                np.random.uniform(-1, 0.8),
                0
            ]))
            csh_gel.add(fluff)

        # 孔隙 - 黑色圆点
        pores = VGroup()
        for i in range(6):
            pore = Circle(radius=0.08, color=BLACK, fill_opacity=0.9)
            pore.shift(RIGHT * 1.5 + np.array([
                np.random.uniform(-1.2, 1.2),
                np.random.uniform(-0.8, 0.8),
                0
            ]))
            pores.add(pore)
        
        microstructure.add(aft_crystals, csh_gel, pores)
        
        # 电子束扫描动画 - 逐行显示微观结构
        self.play(Create(scan_line))
        
        # 扫描线从上往下移动，逐行显示结构
        for i in range(5):
            new_y = 1 - i * 0.5
            self.play(
                scan_line.animate.move_to(camera_frame.get_center() + UP * new_y),
                FadeIn(microstructure[i*5:(i+1)*5]) if i < 3 else Wait(0.1),
                run_time=0.4
            )
        
        # 显示完整的微观结构
        self.play(FadeIn(microstructure))
        self.play(FadeOut(scan_line))
        
        # 标注关键微观特征 - 使用亮色避免与黑色背景重合
        aft_label = Text("针状钙矾石", font_size=14, color="#9370DB")  # 亮紫色
        aft_label.next_to(camera_frame, RIGHT, buff=0.2).shift(UP * 0.5)
        
        csh_label = Text("絮状C-S-H凝胶", font_size=14, color="#00CED1")  # 深青色
        csh_label.next_to(camera_frame, RIGHT, buff=0.2)
        
        pore_label = Text("孔隙", font_size=14, color="#D3D3D3")  # 浅灰色
        pore_label.next_to(camera_frame, RIGHT, buff=0.2).shift(DOWN * 0.5)
        
        self.play(Write(aft_label), Write(csh_label), Write(pore_label))
        
        self.wait(1)
        
        # ========== XRD物相分析 ==========
        # 平滑过渡到XRD图谱
        xrd_title = Text("XRD物相分析", font_size=20, color=YELLOW)
        xrd_title.to_edge(UP, buff=0.5)
        
        # XRD坐标轴
        x_axis = Line(LEFT * 2.5 + DOWN * 1.5, RIGHT * 2.5 + DOWN * 1.5, color=WHITE)
        y_axis = Line(LEFT * 2.5 + DOWN * 1.5, LEFT * 2.5 + UP * 1.5, color=WHITE)
        
        x_label = Text("2θ (°)", font_size=14, color=WHITE)
        x_label.next_to(x_axis, DOWN)
        
        y_label = Text("强度", font_size=14, color=WHITE)
        y_label.next_to(y_axis, LEFT).rotate(PI/2)
        
        # 特征峰数据 (2θ位置, 强度, 物相名称)
        peaks_data = [
            (9.1, 1.2, "钙矾石"),
            (17.8, 0.8, "C-S-H"),
            (29.4, 1.0, "C-S-H"),
            (32.2, 0.9, "氢氧化钙"),
            (50.5, 0.6, "未水化矿渣")
        ]
        
        # 转换坐标
        def xrd_x(pos):
            return -2.5 + (pos / 60) * 5
        
        def xrd_y(intensity):
            return -1.5 + intensity
        
        # 创建基线
        baseline = Line(
            LEFT * 2.5 + DOWN * 1.5,
            RIGHT * 2.5 + DOWN * 1.5,
            color=GRAY, stroke_width=1
        )
        
        # 过渡：SEM淡出，XRD淡入
        self.play(
            FadeOut(camera_frame),
            FadeOut(microstructure),
            FadeOut(aft_label),
            FadeOut(csh_label),
            FadeOut(pore_label),
            FadeOut(sem_view_label),
            FadeOut(sem_group),
            FadeOut(sem_label),
            FadeOut(small_sample),
            Transform(step_title, xrd_title),
            run_time=1.5
        )
        
        # 显示XRD坐标轴
        self.play(Create(x_axis), Create(y_axis))
        self.play(Write(x_label), Write(y_label))
        self.play(Create(baseline))
        
        # 逐个生成特征峰
        prev_point = LEFT * 2.5 + DOWN * 1.5
        all_peaks = VGroup()
        
        for theta, intensity, phase in peaks_data:
            # 峰值点
            peak_top = np.array([xrd_x(theta), xrd_y(intensity), 0])
            peak_bottom = np.array([xrd_x(theta), -1.5, 0])
            
            # 绘制峰
            peak_line = Line(peak_bottom, peak_top, color="#D2691E", stroke_width=3)
            peak_top_dot = Dot(peak_top, color=RED, radius=0.05)
            
            # 物相标注
            phase_text = Text(phase, font_size=10, color=WHITE)
            phase_text.next_to(peak_top_dot, UP, buff=0.1)
            
            self.play(
                Create(peak_line),
                FadeIn(peak_top_dot),
                Write(phase_text),
                run_time=0.8
            )
            
            all_peaks.add(peak_line, peak_top_dot, phase_text)
        
        # XRD说明 - 放在标题和坐标轴之间
        xrd_desc = Text(
            "特征峰对应物相分析",
            font_size=14,
            color=GREEN
        )
        # 放在X轴标签上方，避免遮挡
        xrd_desc.next_to(x_label, DOWN, buff=0.3)
        
        self.play(Write(xrd_desc))
        
        self.wait(2)
        self.clear()
    
    def show_summary(self):
        """总结"""
        title = Text("实验流程总结", font_size=32, color=YELLOW)
        title.to_edge(UP, buff=1)
        
        steps = VGroup()
        step_texts = [
            "1. 铁尾矿机械活化粉磨",
            "2. 原材料称量与配料",
            "3. 胶凝材料混料与浆体制备",
            "4. 试模浇筑与振捣成型",
            "5. 标准养护与终止水化",
            "6. 性能测试与微观表征"
        ]
        
        for i, text in enumerate(step_texts):
            step = Text(text, font_size=20, color=WHITE)
            step.shift(UP * (2 - i * 0.6))
            steps.add(step)
        
        conclusion = Text(
            "高掺量铁尾矿基全固废胶凝材料制备完成！",
            font_size=24,
            color=GREEN
        ).to_edge(DOWN, buff=1)
        
        self.play(Write(title))
        self.play(LaggedStart(*[Write(step) for step in steps], lag_ratio=0.3))
        self.play(Write(conclusion))
        
        self.wait(3)


# 渲染命令:
# manim -pqh manim_experiment.py ExperimentProcess
# -p: 预览
# -qh: 高质量渲染
