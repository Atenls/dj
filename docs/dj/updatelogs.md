<style>
  * {
    font-family: 'PingFang SC', 'SF Pro', 'Hiragino Sans GB', '等线', 'Microsoft YaHei', '微软雅黑', 'Helvetica Neue', 'Helvetica', 'Arial', 'sans-serif';
  }

  .markdown-section {
    max-width: 1200px;
  }

  :root {
    --quality-color-legendary: #7ec5ff;
    --quality-color-unique: #ff5cf7;
    --quality-color-mythic: #ff3939;
  }

  .context {
    max-width: 1000px;
  }

  .redtext {
    color: #f84040; 
    font-weight: 600;
  }

  .quote {
    background: #fbfdff;
    color: #606974;
    border: 1px dashed #ccc;
    border-radius: 5px;
    font-size: 18px;
    padding: 5px;
    margin: 0px;
  }

  .table-container {
    overflow-x: auto;
    -webkit-overflow-scrolling: touch;
  }

  .content-container {
    border-radius: 1em;
    padding: 1em;
    background: rgb(22,7,22);
    color: rgb(222,222,224);
    text-align: left;
    border: 2px solid rgb(36, 0, 90);
    box-shadow: 0 0 8px rgba(36, 0, 90, 0.75);
  }

  .maintitle {
    font-size: 24px;
    font-weight: 800;
    margin: 0.6rem 0;
    color: #333;
    line-height: 1.8;
  }

  .box-context {
    font-size: 16px;
    font-weight: 500;
    color: #888;
    line-height: 1.35;
    text-align: left;
    margin: 12px 24px;
    padding: 12px 0;

    &:hover {
      color: transparent;
    }

    @media (max-width: 768px) {
      margin: 0;
      padding: 12px 4px;
    }

  }

  .tooltip {
    position: relative;
    cursor: pointer;
  }

  .tooltip .tooltip-text {
    visibility: hidden;
    padding: 8px;
    border-radius: 10px;
    position: absolute;
    z-index: 1;
    opacity: 0;
    transition: opacity 0.35s;
    text-shadow: 0.5px 0.5px 1px rgba(0, 0, 0, 0.25);
  }

  .tooltip-top .tooltip-text {
    bottom: 50%;
    left: 50%;
    transform: translateX(-50%);
    font-size: 48px;
  }

  .tooltip-top .tooltip-text::after {
    top: 100%;
    left: 50%;
    transform: translateX(-50%);
    border-color: white transparent transparent transparent;
  }

  .tooltip:hover .tooltip-text {
    visibility: visible;
    color: #555;
    opacity: 1;
  }

  .redbox {
    background: #fdf4f4;
    color: #85553e;
    box-shadow: 0 0 6px #441313a0;
    border-radius: 18px;
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    padding: 20px;
    margin: 0px;
  }

  .greenbox {
    background: #f4fdf7;
    color: #3e854f;
    border: 1px solid #40924e;
    border-radius: 18px;
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    padding: 20px;
    margin: 0px;
  }

  .bluebox {
    background: #f2faff;
    color: #466fa1;
    border: 1px solid #5b9abe;
    border-radius: 18px;
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    padding: 20px;
    margin: 0px;
  }

  .yellowbox {
    background: #fff9f1;
    color: #c5985c;
    border: 1px solid #cfae8f;
    border-radius: 18px;
    font-size: 20px;
    font-weight: 600;
    text-align: center;
    padding: 20px;
    margin: 0px;
  }

  .quote-hl {
    display: inline-block;
    background-color:rgb(248, 248, 248);
    color:rgb(240, 25, 211);
    border-radius: 3px;
    margin: 3px;
    padding: 0px 3px;
  }

  .markdown-section img:not([width]):not([style]) {
    max-width: 600px;
    height: auto;
    max-height: 400px;
    border-radius: 8px;
    box-shadow: 0 0 4px rgba(0,0,0,0.25);
    overflow: hidden;
  }

  .markdown-section h2 {
    font-size: 30px;
    font-weight: 800;
    text-align: center;
    font-family: 'Times New Roman';
    margin: 0.6rem 0;
  }

  .markdown-section h4 {
    margin: 0.6rem 0;
  }

  .markdown-section figure, .markdown-section p {
    margin: 0;
  }

  .markdown-section h1 {
    font-size: 2.5rem;
    font-weight: 800;
    text-shadow: 0 0 1px rgba(0,0,0,0.25);
    text-align: center;
    font-family: 'Times New Roman';
  }

  .little-tips {
    max-width: 360px;
    padding: 1em;
    box-shadow: 0 0 4px #3f9c4380;
    background: #f8fffa;
    border-radius: 6px;
    font-size: 14px;
    margin: 8px 0;
    display: flex;
    gap: 1em;
    align-items: center;
  }

  .little-tips-blue {
    box-shadow: 0 0 4px #5d8cb6a0;
    background: #f7fcff;
  }
  
  .little-tips-purple {
    box-shadow: 0 0 4px #a45db6a0;
    background: #fef7ff;
  }

  .item-name-tag {
    background: #faf7f5;
    padding: 1px 4px;
    border-radius: 4px;
    margin: 4px;
    font-weight: 600;
    color: #333;
    box-shadow: 0 0 1px rgba(46, 22, 6, 0.1);
  }

  .tag-trans {
    background: #effff2;
    margin: 2px 4px;
    padding: 0px 3px;
    border-radius: 3px;
    color: #528f5b;
    font-weight: 600;
    font-size: 14px;
    align-items: center;
    border: 1px solid #67b171;
  }

  .tag-refactor {
    background: #f8efff;
    margin: 2px 4px;
    padding: 0px 3px;
    border-radius: 3px;
    color: #8a64a8;
    font-weight: 600;
    font-size: 14px;
    align-items: center;
    border: 1px solid #9067b1;
  }

  .sha {
    font-size: 14px;
    color: #aaa;
  }

  .highlight-purple {
    font-weight: 600;
    color: rgba(0,0,0,0.75);
    padding: 0 4px;
    border-radius: 20px 20px 10px 10px; 
    background: linear-gradient(
      to bottom, 
      transparent, 
      transparent 30%, 
      rgba(228, 212, 248, 0.6) 50%, 
      rgba(192, 180, 220, 0.5) 100%
    );
  }

  details[open] {
    margin: 0.5em 0;
    transition: margin 0.25s ease-in-out;
  }

  details {
    transition: margin 0.25s ease-in-out;
  }
  
  @media (max-width: 768px) {
    .markdown-section img:not([width]):not([style]) {
      width: 100%;
      max-width: 400px;
    }
  }
</style>

# Update Logs

---

<div class='greenbox'>
<p style="text-align: center; font-size: 16px;">为方便阅览及追踪更新，本栏内容排序将以倒序进行，并由时间作分隔。</p>
</div>

---

# 2026

---

## 2026 Jun.

---

#### 2026/06/01

- 同步了多个性能优化。
- 重写了更适用于 `1.21.11` 的物品管理器反序列化部分。

---

## 2026 May

---

#### 2026/05/28

- 增加了部分安全措施。
- 现在开始禁止非中国大陆地区的 IP 访问 Rapids。
- 修复了部分情况下因竞态引起的相关问题。
- 因部分原因，重新制作了 `副本传送门`

---

#### 2026/05/26

- <span class="tag-trans">迁移</span> 完成了 **采掘系统** 的迁移工作。

---

#### 2026/05/14

- **生命偷取** 计算的最大伤害不再高于怪物最大血量。
- 近战攻击现已转变为「范围攻击」

---

#### 2026/05/10

- 修复/同步了部分问题


---

#### 2026/05/08

- <span class="tag-trans">迁移</span> 完成了 **交易所** 的迁移工作。

---

#### 2026/05/03

- 优化了 `即时性消息` 的处理逻辑，增加了数据类聚合信息功能、新增了数据类缓冲区。

---

#### 2026/05/02

- 修改了部分内容的预加载优先级，提升了稳定性。

---

#### 2026/05/01

- 增加了更自由的箭矢类底层方法。
- 套装效果支持基于等级的公式驱动。
- 方块交互功能优化。

---

## 2026 Apr.

---

#### 2026/04/30

- 新增属性 `箭矢速度`<br>
  该属性将影响射出箭矢的飞行速度，也将间接影响射出箭矢的射程。<br>
  此前默认的 **3.0x** 下调至 **1.5x**，同时 1.5x 将作为新的 `100%` 数值。
- 完成了大量基础建设

---

#### 2026/04/29

- 优化了套装功能，现在 `/stats` 中会显示已生效的所有套装效果。
- 完成了部分物品系统的基础建设。

---

#### 2026/04/28

- 制作了统一的 **ColorUtils** 以方便跨系统同步词条配色。

---

#### 2026/04/27

- **套装**支持多品质套装混合使用，优先生效更高品质的套装效果。<br>
  <div style="background: #e7e9eb; box-shadow: 0 0 8px rgba(127,127,127,0.3); color: #707073; padding: 1em; margin: 8px 0; border-radius: 1em; display: inline-block;">
  <p style="font-size: 16px;"><strong>参考</strong></p>
  <p>
  穿了 3 件 「和光同尘」(传奇) + 2 件 「和光同尘」(史诗) <br>
  此时共生效 5 件 「和光同尘」套装：</p>
  <p>
  <span style="padding-left: 8px; border-left: 4px solid #FFDDBB;"></span>生效 <span style="color: #FFAA00">传奇</span> 两件套效果<br>
  <span style="padding-left: 8px; border-left: 4px solid #C9ACC9;"></span>生效 <span style="color: #CC80CC">史诗</span> 四件套效果
  </p>
  </div>

---

#### 2026/04/26

- 增加了在快捷栏上方提示消息的功能，即时性内容将更多地迁移至此，以避免消息污染。<br>
  <img class="content-container" style="padding: 0; margin: 0.5em; overflow: hidden;" src="/rapids/rapids_img/20260426_hotbarmsg.png" loading="lazy"></img>
- 完成了对于装备的价格评定系统

---

#### 2026/04/25

- 增加了**套装功能**<br>
  <img class="content-container" style="padding: 0; margin: 0.5em; overflow: hidden;" src="/rapids/rapids_img/20260425_wuqi.png" loading="lazy"></img>

---

#### 2026/04/13

- <span class="tag-refactor">重构</span> 重新制作了**技能系统**
  <details>
    <summary style="color: #999 ;">制作了一些含技能的样品</summary>
    <img class="content-container" style="padding: 0; margin: 0.5em; overflow: hidden;" src="/rapids/rapids_img/20260413_san.png" loading="lazy"></img>
    <img class="content-container" style="padding: 0; margin: 0.5em; overflow: hidden;" src="/rapids/rapids_img/20260413_armor.png" loading="lazy"></img>
    <img class="content-container" style="padding: 0; margin: 0.5em; overflow: hidden;" src="/rapids/rapids_img/20260413_weaponskillmsg.png" loading="lazy"></img>
  </details>

---

#### 2026/04/11

- 恢复了 `法杖` 的施法音效，同时为 `射箭` 也添加了音效。<br>法杖施法音效在此前因过于吵闹被取消，现在已变更为更轻量的射箭音效。
- 调整了切换武器冷却保护的逻辑 (俗称卡法杖)，现在切换武器后不再立即清除冷却，而是将异常长的时间转为 `750ms` 冷却。

---

#### 2026/04/10

- 现在法杖也将会在快捷栏中显示施法冷却。

---

#### 2026/04/09


<div class="little-tips" >
  <div style="font-size:24px;">📜</div>
  <div>
    <p><strong>排版设计</strong></p>
    <p style="color:#aaa; font-size: 13px; line-height: 1.35;">正在进行适用于 Rapids 的全新美观设计<br>
     你可于<a href="#/rapids/design">设计</a>查看详情
    </p>
  </div>
</div>

- <span class="tag-refactor">重构</span> 重新制作了**属性词条计算系统**
- 制作了新手武器<br><img src="/rapids/rapids_img/20260409_introbow.png" loading="lazy"></img>
- 修改了箭矢射出的逻辑，现在箭矢在射出时的 `起始点` 之偏移位置会增加玩家自身的矢量<br>弓箭战斗系统增加了对「弩」的支持。
- 正在重新设计属性成长公式
  <details>
      <summary style="color: #999 ;">点击以查看详情</summary>
      <p style="color: #aaa; margin-left: 3px; padding-left: 12px; border-left: 3px solid #ccc;">
      1. 「近战 / 箭矢 / 魔法」攻击的划分现在更加明确，它们的期望 DPS 现遵从 100 : 90 : 70。
      </p>
  </details>

---

#### 2026/04/08

- <span class="tag-refactor">重构</span> 重新制作了**物品管理系统**<br>版本差异过大，迁移问题多多，无法满足需求
- 修复了**数据管理器**的 MySQL 连接异常的问题
- 补充了部分内容的新版本特性

---

#### 2026/04/07

- 新增 `个性签名` 功能，在查看个人属性时可进行修改。它人在查询属性时，也将显示于个人资料中。
- 新增 **木桩** `N1` `N2` 于主城广场


---

#### 2026/04/06

- <span class="tag-trans">迁移</span> 完成了**属性系统**的迁移
  - 制作了内嵌的属性查询功能，并优化了排版<br>![stats](/rapids_img/20260406_stats.png)
    - 通过 `/stats` 查看个人属性
    - 通过 `SHIFT + 右键` 查看他人属性
  - 重新设计了属性对应颜色
  - 现在 `左键` 也可以使用法杖
  - 采用了更健壮的写法
  - 修复了版本更迭导致的差异内容
  - 将部分依赖转译的信息显示更改为原生计算
- 重新调整了基础属性和等级提升属性
- <span class="tag-refactor">重构</span> 重新制作了**等级系统**
  - 现在等级系统不再独立存在，而内嵌于属性系统
  - 使用了性能更佳的写法
  - 重新设计了 `经验加成` 的生效方法，现在将不会存在不同经验加成乘区*（经验券x装备）*。
- 重新调整了经验公式
- <span class="tag-trans">迁移</span> 完成了**物品管理**的迁移
- <span class="tag-trans">迁移</span> 完成了**数据系统**的迁移
- <span class="tag-refactor">重构</span> 重新制作了**方块交互系统**
- <span class="tag-refactor">重构</span> 重新制作了**会话管理系统**
- <span class="tag-refactor">重构</span> 重新制作了**伤害显示系统**
- <span class="tag-refactor">重构</span> 重新制作了**记录系统**
- <span class="tag-refactor">重构</span> 重新制作了**背包管理系统**
- <span class="tag-trans">迁移</span> 完成了**仓库系统**的迁移

- 尝试选择了新的排版，并制作了第一把武器 `不止歇的激流` <br>![](/rapids_img/20260406_不止歇的激流.jpg)


---

#### 2026/04/05

<img src="/rapids/rapids_img/20260405_spawn.jpg" loading="lazy"></img>
- 完成了 **服务端** 的基础框架
  - 完成了适用于 RPG 的规则/参数设置
- 完成了 **主城** 的选定
  - 进行了适用于 Rapids 的风格化改造
- <span class="tag-refactor">重构</span> 重新制作了**世界保护系统** (含玩家交互控制)
- <span class="tag-trans">迁移</span> 开始了**属性系统**的迁移

---

<p style="color: #999;"> 本栏只记录 <strong>2026/04/05</strong> 后的内容 </p>
