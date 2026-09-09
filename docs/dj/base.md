# 基础数据

<span class="author-tag left">最后更新日期</span><span class="author-tag right">2026/09/09</span> <span class="author-tag blue left">作者</span><span class="author-tag blue right"><img class="u-avatar" src="https://qzapp.qlogo.cn/qzapp/101870778/ED573D7852690E2036AA1E7A17CF3F3D/100">莴苣</span>

## 加速阈值

<div class="table-container">
<table style="font-size: 12pt; width: fit-content; font-family: YuGothicUI; text-align: center; vertical-align: middle; white-space: nowrap; padding: 8px 16px 16px; border-radius: 24px; border: 1px solid #ccc;">
<tr style="height: 24.00pt; border-top: none; font-family: 微软雅黑;">
<td style="width: 75pt; color: #172436; font-weight: 500; border: none;">加速值</td>
<td style="width: 10pt; border: none;" rowspan="11"></td>
<td style="width: 50pt; color: #172436; font-weight: 500; border: none;" colspan="2">基础</td>
<td style="width: 10pt; border: none;" rowspan="11"></td>
<td style="width: 50pt; color: #172436; font-weight: 500; border: none;" colspan="2"><div style="display: flex; align-items: center; justify-content: center; gap: 0.25em;">降厄 <img width="20px" style="border-radius: 0.2em; margin: 0;" src="https://icon.jx3box.com/icon/19186.png" /></div></td>
<td style="width: 10pt; border: none;" rowspan="11"></td>
<td style="width: 50pt; color: #172436; font-weight: 500; border: none;" colspan="2"><div style="display: flex; align-items: center; justify-content: center; gap: 0.25em;">降厄狂暴 <img width="20px" style="border-radius: 0.2em; margin: 0;" src="https://icon.jx3box.com/icon/19186.png" /><img width="20px" style="border-radius: 0.2em; margin: 0;" src="https://icon.jx3box.com/icon/2763.png" /></div></td>
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
<td style="font-weight: 600;">10</td>
<td>1.4375s</td>
<td>23</td>
<td rowspan="3">0.9375s</td>
<td rowspan="3">15</td>
<td rowspan="4">0.875s</td>
<td rowspan="4">13</td>
</tr>
<tr style="height: 24.00pt;">
<td>445</td>
<td>1.375s</td>
<td>22</td>
</tr>
<tr style="height: 24.00pt;">
<td>928</td>
<td rowspan="3">1.3125s</td>
<td rowspan="3">21</td>
</tr>
<tr style="height: 24.00pt;">
<td><div style="font-weight: 600; color: rgb(66, 142, 219);">1017</div></td>
<td rowspan="4">0.875s</td>
<td rowspan="4">14</td>
</tr>
<tr style="height: 24.00pt;">
<td><div style="font-weight: 600; color: var(--theme-color);">1165</div></td>
<td rowspan="4">0.8125s</td>
<td rowspan="4">13</td>
</tr>
<tr style="height: 24.00pt;">
<td>1452</td>
<td>1.25s</td>
<td>20</td>
</tr>
<tr style="height: 24.00pt;">
<td>2024</td>
<td rowspan="3">1.1875s</td>
<td rowspan="3">19</td>
</tr>
<tr style="height: 24.00pt;">
<td><div style="font-weight: 600; color: rgb(66, 142, 219);">2172</div></td>
<td rowspan="2">0.8125s</td>
<td rowspan="2">13</td>
</tr>
<tr style="height: 24.00pt;">
<td><div style="font-weight: 600; color: var(--theme-color);">2498</div></td>
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
<div style="width: min(85vw, 625px); align-self: flex-start; padding: 0.5em;">

「虫魄」并非简单的数值条，所以你很难直观地理解到它对应怎样的状态。

事实上，它是一个在 `moon` 上记录的位掩码，俗地讲，它是一个 **二进制数**。

释放不同技能通过**位或**运算更新当前状态，你可以通过右表查看技能对应的状态码。

以不鸣后的状态为例：

<img height="40px" style="margin: 0.25em 0" src="https://cdn.jx3box.com/upload/post/2026/5/26/125668_7450523.png" />

当前拥有 蝎心、蛇影、百足、蟾啸，实际对应的 `moon` 值为：**23** <span style="color: #ccc;">(1 | 2 | 4 | 16)</span>

此时你可以通过宏语句

<div style="background: #f8f8f8; color: black; font-family: 'Roboto Mono', Monaco, 'Inter', 'Microsoft YaHei'; padding: 0.5em 1em; margin: 0.5em 0;">
/cast moon=23 千丝
</div> 

来确保在这一虫魄状态时释放千丝。

</div>
<div>
<table style="display: block; border-collapse: collapse; width: fit-content; text-align: center; border-image: initial; vertical-align: middle; align-items: center; white-space: nowrap; margin: 4px; padding: 16px; border-radius: 16px; box-shadow: 4px 2px 10px #bbb;"><colgroup><col style="width: 60px;" /><col style="width: 120px;" /><col style="width: 60px;" /></colgroup>
<tbody style="margin: 1em;">
<tr style="height: 3em;">
<td style="width: 60px;"><strong>技能</strong></td>
<td style="width: 120px;"><strong>二进制</strong></td>
<td style="width: 60px;"><strong>十进制</strong></td>
</tr>
<tr>
<td><img width="40px" style="border-radius: 0.5em;" src="https://icon.jx3box.com/icon/2784.png" /></td>
<td style="font-family: 'Roboto Mono'">0b10000</td>
<td>16</td>
</tr>
<tr>
<td><img width="40px" style="border-radius: 0.5em;" src="https://icon.jx3box.com/icon/2787.png" /></td>
<td style="font-family: 'Roboto Mono'">0b01000</td>
<td>8</td>
</tr>
<tr>
<td><img width="40px" style="border-radius: 0.5em;" src="https://icon.jx3box.com/icon/2786.png" /></td>
<td style="font-family: 'Roboto Mono'">0b00100</td>
<td>4</td>
</tr>
<tr>
<td><img width="40px" style="border-radius: 0.5em;" src="https://icon.jx3box.com/icon/2785.png" /></td>
<td style="font-family: 'Roboto Mono'">0b00010</td>
<td>2</td>
</tr>
<tr>
<td><img width="40px" style="border-radius: 0.5em;" src="https://icon.jx3box.com/icon/2783.png" /></td>
<td style="font-family: 'Roboto Mono'">0b00001</td>
<td >1</td>
</tr>
</tbody>
</table>
</div>
</div>

## 技能系数

暂略

## DOT 相关

