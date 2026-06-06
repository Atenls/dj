# 基础数据

预计添加各类数值相关的内容，缓慢更新中。

## 加速阈值

<div class="table-container">
<table style="font-size: 12pt; width: fit-content; font-family: YuGothicUI; text-align: center; vertical-align: middle; white-space: nowrap; padding: 8px 16px 16px; border-radius: 24px; border: 1px solid #ccc;">
<tr style="height: 24.00pt; border-top: none; font-family: 微软雅黑;">
<td style="width: 60pt; color: #172436; font-weight: 500; border: none;">加速值</td>
<td style="width: 10pt; border: none;" rowspan="11"></td>
<td style="width: 50pt; color: #172436; font-weight: 500; border: none;" colspan="2">基础</td>
<td style="width: 10pt; border: none;" rowspan="11"></td>
<td style="width: 50pt; color: #172436; font-weight: 500; border: none;" colspan="2">降厄</td>
<td style="width: 10pt; border: none;" rowspan="11"></td>
<td style="width: 50pt; color: #172436; font-weight: 500; border: none;" colspan="2">降厄狂暴</td>
</tr>
<tr style="height: 24.00pt;">
<td style="width: 80px;">0</td>
<td style="width: 80px;">1.5s</td>
<td style="width: 80px;">24</td>
<td style="width: 80px;">1s</td>
<td style="width: 80px;">16</td>
<td style="width: 80px;">0.9375s</td>
<td style="width: 80px;">15</td>
</tr>
<tr style="height: 24.00pt;">
<td style="font-weight: 600; color: var(--theme-color);">206</td>
<td>1.4375s</td>
<td>23</td>
<td rowspan="3">0.9375s</td>
<td rowspan="3">15</td>
<td rowspan="4">0.875s</td>
<td rowspan="4">13</td>
</tr>
<tr style="height: 24.00pt;">
<td>9232</td>
<td>1.375s</td>
<td>22</td>
</tr>
<tr style="height: 24.00pt;">
<td>19285</td>
<td rowspan="3">1.3125s</td>
<td rowspan="3">21</td>
</tr>
<tr style="height: 24.00pt;">
<td style="font-weight: 600; color: var(--theme-color);">21131</td>
<td rowspan="4">0.875s</td>
<td rowspan="4">14</td>
</tr>
<tr style="height: 24.00pt;">
<td style="font-weight: 600; color: var(--theme-color);">24209</td>
<td rowspan="4">0.8125s</td>
<td rowspan="4">13</td>
</tr>
<tr style="height: 24.00pt;">
<td>30158</td>
<td>1.25s</td>
<td>20</td>
</tr>
<tr style="height: 24.00pt;">
<td>42057</td>
<td rowspan="3">1.1875s</td>
<td rowspan="3">19</td>
</tr>
<tr style="height: 24.00pt;">
<td style="font-weight: 600; color: var(--theme-color);">45134</td>
<td rowspan="2">0.8125s</td>
<td rowspan="2">13</td>
</tr>
<tr style="height: 24.00pt;">
<td style="font-weight: 600; color: var(--theme-color-dark);">51905</td>
<td>0.75s</td>
<td>12</td>
</tr>
</table>
</div>

## 虫魄的宏状态表示

<div class="flex-container" style="
    border: 1px solid #ccc;
    width: fit-content;
    padding: 1em;
    border-radius: 2em;
    gap: 0.5em;
    ">
<div style="width: min(85vw, 800px); align-self: flex-start; padding: 0.5em;">

「虫魄」并非简单的数值条，所以你很难直观地理解到它对应怎样的状态。

事实上，它是一个在 `moon` 上记录的位掩码，通过位运算进行结算判断。通俗地讲，它是一个 **二进制数**。

释放不同技能通过位或运算更新当前状态，你可以通过右表查看技能对应的状态码。

以不鸣后的状态为例：

<img height="48px" style="margin: 0" src="https://cdn.jx3box.com/upload/post/2026/5/26/125668_7450523.png" />

此时的状态是拥有 蝎心、蛇影、百足、蟾啸，实际对应的 `moon` 值为：**23** <span style="color: #ccc;">(1 | 2 | 4 | 16)</span>

此时你可以通过宏语句

<div style="background: #f8f8f8; color: black; font-family: 'Roboto Mono', Monaco, 'Inter', 'Microsoft YaHei'; padding: 0.5em 1em; margin: 0.5em 0;">
/cast moon=23 千丝
</div> 

来确保在这一虫魄状态时释放千丝。

</div>
<div>
<table style="display: block; border-collapse: collapse; width: fit-content; text-align: center; border-image: initial; vertical-align: middle; align-items: center; white-space: nowrap; margin: 4px; padding: 16px; border-radius: 16px; box-shadow: 4px 2px 10px #bbb;"><colgroup><col style="width: 90px;" /><col style="width: 125px;" /><col style="width: 90px;" /></colgroup>
<tbody style="margin: 1em;">
<tr style="height: 3em;">
<td style="width: 90px;"><strong>技能</strong></td>
<td style="width: 120px;"><strong>二进制</strong></td>
<td style="width: 90px;"><strong>十进制</strong></td>
</tr>
<tr>
<td style="width: 80px;"><img class="e-jx3-icon" style="border-radius: 0.5em; padding: 0; margin-bottom: 0; box-shadow: 0 0 4px rgba(0,0,0,0.3);" src="https://icon.jx3box.com/icon/2784.png" /></td>
<td style="width: 120px;">0b10000</td>
<td style="width: 90px;">16</td>
</tr>
<tr>
<td style="width: 80px;"><img class="e-jx3-icon" style="border-radius: 0.5em; padding: 0; margin-bottom: 0; box-shadow: 0 0 4px rgba(0,0,0,0.3);" src="https://icon.jx3box.com/icon/2787.png" /></td>
<td style="width: 120px;">0b01000</td>
<td style="width: 90px;">8</td>
</tr>
<tr>
<td style="width: 80px;"><img class="e-jx3-icon" style="border-radius: 0.5em; padding: 0; margin-bottom: 0; box-shadow: 0 0 4px rgba(0,0,0,0.3);" src="https://icon.jx3box.com/icon/2786.png" /></td>
<td style="width: 120px;">0b00100</td>
<td style="width: 90px;">4</td>
</tr>
<tr>
<td style="width: 80px;"><img class="e-jx3-icon" style="border-radius: 0.5em; padding: 0; margin-bottom: 0; box-shadow: 0 0 4px rgba(0,0,0,0.3);" src="https://icon.jx3box.com/icon/2785.png" /></td>
<td style="width: 120px;">0b00010</td>
<td style="width: 90px;">2</td>
</tr>
<tr>
<td style="width: 80px;"><img class="e-jx3-icon" style="border-radius: 0.5em; padding: 0; margin-bottom: 0; box-shadow: 0 0 4px rgba(0,0,0,0.3);" src="https://icon.jx3box.com/icon/2783.png" /></td>
<td style="width: 120px;">0b00001</td>
<td style="width: 90px;">1</td>
</tr>
</tbody>
</table>
</div>
</div>