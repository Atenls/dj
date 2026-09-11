# 基础数据

<span class="author-tag left">最后更新日期</span><span class="author-tag right">2026/09/12 <span style="border-left: 1px solid #8f4caa; padding-left: 0.25em;">苍生铸世</span></span> <span class="author-tag blue left">作者</span><span class="author-tag blue right">莴苣</span>

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

<div style="background: #f8f8f8; border-left: 0.5em solid rgba(226, 224, 255); color: black; font-family: 'Roboto Mono', Monaco, 'Inter', 'Microsoft YaHei'; padding: 0.5em; margin: 0.5em 0; wrap: auto-wrap;">
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

### 直伤

<div class="table-container">
<table style="font-size: 12pt; width: fit-content; font-family: YuGothicUI; text-align: center; vertical-align: middle; white-space: nowrap; padding: 8px 16px 16px; border-radius: 24px; border: 1px solid #ccc;"><colgroup><col style="width: 150px;" /><col style="width: 100px;" /><col style="width: 150px;" /><col style="width: 60px;" /></colgroup>
<tr style="height: 24.00pt; font-family: 微软雅黑; border-top: none; ">
<td style="color: #172436; font-weight: 500; border: none;">技能</td>
<td style="color: #172436; font-weight: 500; border: none;">技能 ID</td>
<td style="color: #172436; font-weight: 500; border: none;">实际系数</td>
<td style="color: #172436; font-weight: 500; border: none;">备注</td>
</tr>
<tr><td><div style="display: flex; align-items: center; justify-content: center; gap: 0.25em;"><img width="20px" style="border-radius: 0.2em; margin: 0;" src="https://icon.jx3box.com/icon/2786.png" /> 百足</div></td><td>13472</td><td>0.488163</td><td></td></tr>
<tr><td><div style="display: flex; align-items: center; justify-content: center; gap: 0.25em;"><img width="20px" style="border-radius: 0.2em; margin: 0;" src="https://icon.jx3box.com/icon/2785.png" /> 蛇影</div></td><td>21303</td><td>0.427626</td><td></td></tr>
<tr><td><div style="display: flex; align-items: center; justify-content: center; gap: 0.25em;"><img width="20px" style="border-radius: 0.2em; margin: 0;" src="https://icon.jx3box.com/icon/2783.png" /> 蝎心</div></td><td>9331</td><td>0.396713</td><td></td></tr>
<tr><td><div style="display: flex; align-items: center; justify-content: center; gap: 0.25em;"><img width="20px" style="border-radius: 0.2em; margin: 0;" src="https://icon.jx3box.com/icon/25006.png" /> 蝎心·尻尾</div></td><td>40198</td><td>0.386409</td><td></td></tr>
<tr><td><div style="display: flex; align-items: center; justify-content: center; gap: 0.25em;"><img width="20px" style="border-radius: 0.2em; margin: 0;" src="https://icon.jx3box.com/icon/11895.png" /> 千丝·蛛魄</div></td><td>21821</td><td>1.030424</td><td></td></tr>
<tr><td><div style="display: flex; align-items: center; justify-content: center; gap: 0.25em;"><img width="20px" style="border-radius: 0.2em; margin: 0;" src="https://icon.jx3box.com/icon/14140.png" /> 连缘蛊</div></td><td>25044</td><td>0.141039</td><td>读条每跳</td></tr>
<tr><td><div style="display: flex; align-items: center; justify-content: center; gap: 0.25em;"><img width="20px" style="border-radius: 0.2em; margin: 0;" src="https://icon.jx3box.com/icon/14140.png" /> 连缘蛊·额外</div></td><td>30918</td><td>0.156496<br>0.313635<br>0.470775<br>0.627915<br>0.785054</td><td>尾跳</td></tr>
<tr><td><div style="display: flex; align-items: center; justify-content: center; gap: 0.25em;"><img width="20px" style="border-radius: 0.2em; margin: 0;" src="https://icon.jx3box.com/icon/2777.png" /> 蛊毒</div></td><td>18590</td><td>0.010304</td><td>灵蛊</td></tr>
<tr><td><div style="display: flex; align-items: center; justify-content: center; gap: 0.25em;"><img width="20px" style="border-radius: 0.2em; margin: 0;" src="https://icon.jx3box.com/icon/19186.png" /> 降厄</div></td><td>42222</td><td>0.096602</td><td></td></tr>
<tr><td><div style="display: flex; align-items: center; justify-content: center; gap: 0.25em;"><img width="20px" style="border-radius: 0.2em; margin: 0;" src="https://icon.jx3box.com/icon/25007.png" /> 令怖</div></td><td>42295</td><td>0.041217</td><td>每层</td></tr>
<tr><td><div style="display: flex; align-items: center; justify-content: center; gap: 0.25em;"><img width="20px" style="border-radius: 0.2em; margin: 0;" src="https://icon.jx3box.com/icon/2801.png" /> 不鸣</div></td><td>37959</td><td>0.579613</td><td></td></tr>
<tr><td><div style="display: flex; align-items: center; justify-content: center; gap: 0.25em;"><img width="20px" style="border-radius: 0.2em; margin: 0;" src="https://icon.jx3box.com/icon/11894.png" /> 残香</div></td><td>38456</td><td>0.115923</td><td></td></tr>
<tr><td><div style="display: flex; align-items: center; justify-content: center; gap: 0.25em;"><img width="20px" style="border-radius: 0.2em; margin: 0;" src="https://icon.jx3box.com/icon/25008.png" /> 虫魄</div></td><td>42277</td><td>0.154564</td><td></td></tr>
<tr><td><div style="display: flex; align-items: center; justify-content: center; gap: 0.25em;"><img width="24px" style="border-radius: 0.2em; margin: 0; border: 2px solid rgba(255, 140, 0, 0.5);" src="https://icon.jx3box.com/icon/2783.png" /> 赤蝎</div></td><td>39036</td><td>1.309927</td><td></td></tr>
<tr><td><div style="display: flex; align-items: center; justify-content: center; gap: 0.25em;"><img width="24px" style="border-radius: 0.2em; margin: 0; border: 2px solid rgba(255, 140, 0, 0.5);" src="https://icon.jx3box.com/icon/2785.png" /> 蛇影·神兵</div></td><td>25773</td><td>0.038641</td><td></td></tr>
</table>
</div>

### DOT

<div class="table-container">
<table style="font-size: 12pt; width: fit-content; font-family: YuGothicUI; text-align: center; vertical-align: middle; white-space: nowrap; padding: 8px 16px 16px; border-radius: 24px; border: 1px solid #ccc;">
<colgroup><col style="width: 150px;" /><col style="width: 100px;" /><col style="width: 150px;" /><col style="width: 60px;" /></colgroup>
<tr style="height: 24.00pt; font-family: 微软雅黑; border-top: none;">
<td style="color: #172436; font-weight: 500; border: none;">技能</td>
<td style="color: #172436; font-weight: 500; border: none;">技能 ID</td>
<td style="color: #172436; font-weight: 500; border: none;">跳数 / 间隔</td>
<td style="color: #172436; font-weight: 500; border: none;">单跳系数</td>
</tr>
<tr><td><div style="display: flex; align-items: center; justify-content: center; gap: 0.25em;"><img width="20px" style="border-radius: 0.2em; margin: 0;" src="https://icon.jx3box.com/icon/2783.png" /> 蝎心(DOT)</div></td><td>6218</td><td>6 × 32</td><td>0.076638</td></tr>
<tr><td><div style="display: flex; align-items: center; justify-content: center; gap: 0.25em;"><img width="20px" style="border-radius: 0.2em; margin: 0;" src="https://icon.jx3box.com/icon/2785.png" /> 蛇影(DOT)</div></td><td>2296</td><td>6 × 32</td><td>0.061503</td></tr>
<tr><td><div style="display: flex; align-items: center; justify-content: center; gap: 0.25em;"><img width="20px" style="border-radius: 0.2em; margin: 0;" src="https://icon.jx3box.com/icon/2786.png" /> 百足(DOT)</div></td><td>12557</td><td>9 × 32</td><td>0.131164</td></tr>
<tr><td><div style="display: flex; align-items: center; justify-content: center; gap: 0.25em;"><img width="20px" style="border-radius: 0.2em; margin: 0;" src="https://icon.jx3box.com/icon/2784.png" /> 蟾啸(DOT)</div></td><td>2295</td><td>9 × 32</td><td>0.077282</td></tr>
<tr><td><div style="display: flex; align-items: center; justify-content: center; gap: 0.25em;"><img width="20px" style="border-radius: 0.2em; margin: 0;" src="https://icon.jx3box.com/icon/13445.png" /> 释灵(DOT)</div></td><td>37352</td><td>8 × 16</td><td>0.055788</td></tr>
</table>
</div>

### 宠物

待更新