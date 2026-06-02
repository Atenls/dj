<!-- dj/_sidebar.md -->
<style>

.sidebar li {
    margin: 6px 0 6px 0;
    padding: 8px 0 8px 4px;
    box-shadow: 0 0 6px rgb(81 62 96 / 20%);
    border-radius: 1em 0 0 1em;
}

.sidebar li a {
    position: relative;
    padding-left: 1em;

    &::before {
      content: "";
      position: absolute;
      left: 4px;
      top: 15px;
      transform: translateY(-50%);
      width: 5px;
      height: 18px;
      background: rgb(180, 180, 180, 0.5);
      border-radius: 4px;
    }

    &:hover::before {
      content: "";
      background: rgb(132, 73, 172);
    }
}

.title {
    font-size: 1.5em;
    font-weight: 600;
    color: transparent; 
    background: linear-gradient(
        135deg, 
        oklch(0.7882 0.0814 245), 
        oklch(53.364% 0.12053 305), 
        oklch(68.865% 0.13644 330)
    ) text; 
    text-shadow: 0 0 1px rgba(67, 29, 99, 0.2);
    margin: 1em auto;
    width: fit-content;
}
</style>


<p class="title">「毒理学手札」</p>

* [首页](dj/README)
* [「降厄」详解](dj/降厄)
* [配装参考](dj/equip)
