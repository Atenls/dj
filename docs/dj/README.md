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

# 毒理学手札

---


