<style>

  .markdown-section {
    max-width: 1280px;
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

  .markdown-section figure, .markdown-section p {
    margin: 0;
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

# 毒理学手札

<span style="
background: #8f4caa;
color: #f0f0f0;
text-shadow: 0.5px 1px 0.5px rgba(0, 0, 0, 0.25);
padding: 2px 4px;
border-radius: 4px 0 0 4px;
font-size: 14px;
">最后更新日期</span><span style="
background: #fefcfe;
color: #8f4caa;
text-shadow: 0.5px 1px 0.5px rgba(0, 0, 0, 0.25);
padding: 1px 5px;
border: 1px solid #8f4caa;
border-radius: 0 4px 4px 0;
font-weight: 500;
font-size: 14px;
">2026/06/02</span>

---

**毒理学手札** 是由「毒理学第一实验室」整理与维护的《剑网3》旗舰端毒经 PVE 攻略站。主要负责人为「小莴苣」。

本站主要产出毒经相关的流派解析、循环构建、属性收益与机制研究，内容以推导、实测和长期版本跟踪为基础，尽量减少经验化结论，旨在提供更稳定、可复核的参考。

## 内容方向

- 毒经 PVE 流派与奇穴解析
- 输出循环、轴表与实战处理
- 加速段位、GCD、DOT 跳数等机制研究
- 配装、属性收益与版本适配
- 常见问题、误区等

## 说明

本站内容并非固定答案，而是基于当前赛季环境下的阶段性研究结果。  
随着版本改动、数值调整与实战样本增加，部分结论可能会持续修订。

若你希望系统理解毒经，而不是只照抄一个宏或一套循环，这里应该能提供一些详实有用的参考。


---

本栏内容遵从 [CC-BY-SA 4.0 License](https://creativecommons.org/licenses/by-sa/4.0/)

---

<details>
<summary>审美积累</summary>

<img src="/dj/img/杂项/xwj_20260602.png" loading="lazy">

很萌 ↑

</details>