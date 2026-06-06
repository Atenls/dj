# 模拟器使用指北

毒经模拟器是一个用来模拟循环的工具，其基于 `唐宋` 开发的框架，心法框架迁移由 `蓝团` 完成，具体技能/奇穴实现及后续更新维护由 `莴苣` 负责。

---

## 模拟器在哪？

其依托于在线计算器，作为附属子功能而存在。你可通过 [计算器](https://dps.btcsg.top/dps?xf=dj) 前往毒经计算器页面。

你可以在计算器的「基础设置」栏底部（或「角色属性」栏上方）找到 `循环模拟` 按钮，点击即可进入模拟器页面

<img src="/dj/img/simc/image.png" loading="lazy">

---

## 使用方法

以下是模拟器的界面，模拟器界面可粗略地分为 3 个区域：`设置区` `循环区` `技能选择区`

<img src="/dj/img/simc/image-3.png" loading="lazy">

此时依功能分类细化为各部分：

<div id="技能选择区" style="margin: 1em 0 0.5em; background: oklch(0.7353 0.1184 286.94); color: white; text-shadow: 1px 1px 1px rgba(0,0,0,0.25); padding: 0.375em 1em; font-weight: 800; width: fit-content; border-radius: 0.5em;">
技能选择区
</div>
<div style="border: 0.5px solid oklch(0.7353 0.1184 286.94); padding: 1em 1.5em; width: min(92.5vw, 768px); border-radius: 0.5em;">

通过 **点击技能** 即可添加技能到循环中的最后一位。当前运行时的技能状态也将显示在此处。

以灵蛊为例：
<div class="flex-container">

<img src="/dj/img/simc/image-2.png" loading="lazy" width="60px" style="border-radius: 6px; box-shadow: 0 0 2px #88888880; border: 1px solid #c0c0c8;">

<div>

- 右上角红色角标代表此时技能的 `CD`，如选择插入则需等待指定时间（中止）。
- 右下角紫色角标代表技能的 `充能层数`。

</div>

</div>
</div>

<div id="增益选择区" style="margin: 1em 0 0.5em; background: oklch(0.7353 0.1381 292.12); color: white; text-shadow: 1px 1px 1px rgba(0,0,0,0.25); padding: 0.375em 1em; font-weight: 800; width: fit-content; border-radius: 0.5em;">
增益选择区
</div>
<div style="border: 0.5px solid oklch(0.7353 0.1381 292.12); padding: 1em 1.5em; width: min(92.5vw, 768px); border-radius: 0.5em;">

增益选择区用于选择是否启用增益及增益快照功能。

建议通常 `启用增益` 并同时启用 `团队增益快照` 功能。除试炼等场合外，不基于增益的循环模拟基本毫无意义。

<div class="flex-container" style="gap: 0.5em;">
<img src="/dj/img/simc/image-4.png" loading="lazy" width="480px" style="border-radius: 6px; box-shadow: 0 0 2px #88888880; border: 1px solid #c0c0c8;">
<img src="/dj/img/simc/image-5.png" loading="lazy" style="border-radius: 6px; box-shadow: 0 0 2px #88888880; border: 1px solid #c0c0c8;">
</div>

在启用后，你可于左上角看见现正生效的增益及其运行时数据。点击对应的增益可以看见该增益的覆盖范围（红线）。

</div>


<div id="延迟设置区" style="margin: 1em 0 0.5em; background: oklch(0.7353 0.1431 298.47); color: white; text-shadow: 1px 1px 1px rgba(0,0,0,0.25); padding: 0.375em 1em; font-weight: 800; width: fit-content; border-radius: 0.5em;">
延迟设置区
</div>
<div style="border: 0.5px solid oklch(0.7353 0.1431 298.47); padding: 1em 1.5em; width: min(92.5vw, 768px); border-radius: 0.5em;">

在此设置模拟器运行时的技能延迟，通常情况下以 `帧` 为单位，即 `1/16` 秒或 `62.5ms`。

然而在模拟中，**每次技能释放都会增加 1 次设定的延迟**。

设置为 `低延迟(1-45ms)` 时，实际上会给每个技能都附加 `62.5ms` 。这太固定，无法模拟更多实际情况。
<span style="color: #999;">(预设档位考虑到普遍的输入延迟、波动等原因，标注比实际的延迟要低。)</span>

<div class="flex-container" style="border-top: 1px solid oklch(0.7353 0.1431 298.47 / 45%); border-bottom: 1px solid oklch(0.7353 0.1431 298.47 / 45%); margin: 0.5em 0;">

<div style="width: min(82vw, 525px);">

因此，毒经模拟器提供了一个更符合游戏中真实情况的技能延迟设置：

`周期性忽略延迟` 你可以基于此设置更自由的总体延迟。周期性忽略延迟，顾名思义，每间隔 `X` 个技能，忽略一次延迟。

参考：`低延迟(1-45ms)` 

- `1`: 忽略一半的延迟 → `31.25ms`
- `2`: 忽略33%的延迟 → `41.67ms`
- `0.5`: 忽略66%的延迟 → `20.83ms`

</div>

<div>

<div class="table-container" style="margin-top: 10px;">
<table style="font-size: 12pt; width: fit-content; font-family: YuGothicUI; text-align: center; vertical-align: middle; white-space: nowrap; padding: 6px 12px 12px; border-radius: 1em; border: 1px solid #ccc;">
<tr style="height: 24.00pt; border-top: none; font-family: 微软雅黑;">
<td style="width: 60pt; color: #172436; font-weight: 500; border: none;">档位</td>
<td style="width: 10pt; border: none;" rowspan="10"></td>
<td style="width: 50pt; color: #172436; font-weight: 500; border: none;">实际延迟</td>
</tr>
<tr style="height: 24.00pt;">
<td style="width: 80px;">理论</td>
<td style="width: 80px;">0</td>
</tr>
<tr style="height: 24.00pt;">
<td style="width: 80px;">低延迟</td>
<td style="width: 80px;">62.5</td>
</tr>
<tr style="height: 24.00pt;">
<td style="width: 80px;">中延迟</td>
<td style="width: 80px;">125</td>
</tr>
<tr style="height: 24.00pt;">
<td style="width: 80px;">高延迟</td>
<td style="width: 80px;">187.5ms</td>
</tr>
<tr style="height: 24.00pt;">
<td style="width: 80px;">超高延迟</td>
<td style="width: 80px;">250</td>
</tr>
</table>
</div>

</div>
</div>

如需设置技能单独延迟，请参照 `循环运行区` 内容。

</div>

<div id="循环运行区" style="margin: 1em 0 0.5em; background: oklch(0.7353 0.1554 304.82); color: white; text-shadow: 1px 1px 1px rgba(0,0,0,0.25); padding: 0.375em 1em; font-weight: 800; width: fit-content; border-radius: 0.5em;">
循环运行区
</div>
<div style="border: 0.5px solid oklch(0.7353 0.1554 304.82); padding: 1em 1.5em; width: min(92.5vw, 768px); border-radius: 0.5em;">

已添加的技能将显示在此处，模拟器将遵照此顺序进行模拟战斗。

除此之外，你还可以通过右键该区技能来调整技能的相关设置。

<div class="flex-container">
<div>

在GCD技能中释放其他瞬发技能时，模拟器会视作在GCD初秒放，这不符合实际需求。

以右图为例，在降厄千丝中开橙武。橙武应该释放在 GCD 末尾，则右键橙武，并设置技能延迟时间为 `14` 帧。

<span style="color: #999;">(14 帧是 21131 加速下降厄期间的 GCD，参考[基础数据](/dj/base))</span>

这样，就能妥善地保证模拟器中瞬发技能固定在 GCD 末尾释放。

</div>
<img src="/dj/img/simc/image-6.png" loading="lazy" style="border-radius: 6px; box-shadow: 0 0 2px #88888880; border: 1px solid #c0c0c8;">

</div>

你还可以在技能位置插入其他技能，来便捷地尝试更换不同排列。或移除后续所有技能，来快速重新设置循环。

</div>

---

## 保存循环

在构建循环完毕后，你可以通过右上角的 `保存为自定义循环` 来导出、保存到计算器的自定循环中。

你需要自己填写加速档位数值，来避免保存了错误的加速段位以致产生错误的结果。

<img src="/dj/img/simc/save.png" loading="lazy" style="padding: 0 11.5px;">

这样，你就完成了一次完整的自定义循环构建。开始愉快地尝试赛博木桩吧！

## 模拟器与游戏的底层逻辑

模拟器中所有技能的施法效果与逻辑结算顺序均尽可能与技能lua保持一致，以确保模拟的准确性。

待更新。