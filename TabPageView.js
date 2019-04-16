DBFX.RegisterNamespace("DBFX.Web.Controls");
DBFX.RegisterNamespace("DBFX.Web.NavControls");
DBFX.RegisterNamespace("DBFX.Design");
DBFX.RegisterNamespace("DBFX.Serializer");
DBFX.RegisterNamespace("DBFX.Design.ControlDesigners");
DBFX.RegisterNamespace("DBFX.Design.TypeEditors");

DBFX.Web.Controls.TabPageView = function () {
    var pv = new DBFX.Web.Controls.Control("TabPageView");
    pv.ClassDescriptor.Designers.splice(1, 0, "DBFX.Design.ControlDesigners.TabPageViewDesigner");

    pv.ClassDescriptor.Serializer = "DBFX.Serializer.TabPageViewSerializer";
    //
    // pv.ClassDescriptor.DesignTimePreparer = "DBFX.Design.TabPageViewDesignTimePreparer";

    pv.VisualElement = document.createElement("DIV");
    pv.VisualElement.className = "TabPageView";
    pv.Pages = [];
    pv.PagesJSONString = '';

    pv.Items = new Array();
    pv.Controls = new DBFX.Web.Controls.ControlsCollection(pv);

    pv.OnCreateHandle();
    pv.OnCreateHandle = function () {
        pv.VisualElement.innerHTML = "<DIV class='TabPageViewContainer'><DIV class='TabPageViewPagesPanel'></DIV><DIV class='TabPageViewWebView'></DIV></DIV>";

        pv.PagesPanel = pv.VisualElement.querySelector("DIV.TabPageViewPagesPanel");
        pv.WebView = pv.VisualElement.querySelector("DIV.TabPageViewWebView");

        pv.ppv = new DBFX.Web.NavControls.PagePartView();
        pv.ppv.Width = "100%";
        pv.ppv.Height = "100%";

        //解决寻找Form问题
        pv.ppv.TabPageView = pv;

        pv.WebView.appendChild(pv.ppv.VisualElement);

    }

/********         属性设置 start              **/

    //列表对象集合
    pv.itemSource = [];
    Object.defineProperty(pv, "ItemSource", {
        get: function () {
            return pv.itemSource;
        },
        set: function (v) {
            pv.itemSource = v;
            pv.CreatePages();
        }
    });

    //标题成员
    pv.textMember = "Text";
    Object.defineProperty(pv, "TextMember", {
        get: function () {
            return pv.textMember;
        },
        set: function (v) {
            pv.textMember = v;
            pv.RefreshDisplay();
        }
    });

    //副标题成员
    pv.subTitleMember = "SubTitle";
    Object.defineProperty(pv, "SubTitleMember", {
        get: function () {
            return pv.subTitleMember;
        },
        set: function (v) {

            pv.subTitleMember = v;
            pv.RefreshDisplay();
        }
    });

    //图片成员
    //TODO:默认图像
    pv.imgMember = "DefaultImg";
    Object.defineProperty(pv, "ImgMember", {
        get: function () {
            return pv.imgMember;
        },
        set: function (v) {
            pv.imgMember = v;
            pv.RefreshDisplay();
        }
    });


    //TODO:选中图像
    pv.selectedImgMember = "SelectedImg";
    Object.defineProperty(pv, "SelectedImgMember", {
        get: function () {
            return pv.selectedImgMember;
        },
        set: function (v) {

            pv.selectedImgMember = v;
        }
    });


    //资源成员
    pv.pageUriMember = "PageUri";
    Object.defineProperty(pv, "PageUriMember", {
        get: function () {
            return pv.pageUriMember;
        },
        set: function (v) {
            pv.pageUriMember = v;
        }
    });



    //TODO:导航栏位置
    pv.naviBarPos = "top";
    Object.defineProperty(pv, "NaviBarPos", {
        get: function () {
            return pv.naviBarPos;
        },
        set: function (v) {
            pv.naviBarPos = v;
            switch (v){
                case "top"://在上
                    pv.PagesPanel.className = "TabPageViewPagesPanel";
                    pv.WebView.style.top = pv.naviBarH;
                    pv.WebView.style.bottom = "0px";
                    break;
                case "bottom"://在下
                    pv.PagesPanel.className = "TabPageViewPagesPanel_Bottom";
                    pv.WebView.style.top = "0px";
                    pv.WebView.style.bottom = pv.naviBarH;
                    break;
                default:
                    break;
            }

        }
    });


    //TODO:导航栏高度
    pv.naviBarH = "32px";
    Object.defineProperty(pv, "NaviBarH", {
        get: function () {
            return pv.naviBarH;
        },
        set: function (v) {
            pv.naviBarH = v;
            pv.PagesPanel.style.height = v;

            switch (pv.naviBarPos){
                case "top"://在上
                    pv.WebView.style.top = v;
                    pv.WebView.style.bottom = "0px";
                    break;
                case "bottom"://在下
                    pv.WebView.style.top = "0px";
                    pv.WebView.style.bottom = v;
                    break;
                default:
                    break;
            }

        }
    });


    //TODO:导航栏背景色
    pv.naviBarBGC = "transparent";
    Object.defineProperty(pv, "NaviBarBGC", {
        get: function () {
            return pv.naviBarBGC;
        },
        set: function (v) {
            pv.naviBarBGC = v;
            pv.PagesPanel.style.backgroundColor = v;
        }
    });


    //TODO:导航Item默认背景色
    pv.itemDefaultBGC = "#d8dbdc";
    Object.defineProperty(pv, "ItemDefaultBGC", {
        get: function () {
            return pv.itemDefaultBGC;
        },
        set: function (v) {
            pv.itemDefaultBGC = v;
            pv.RefreshDisplay();
        }
    });

    //TODO:导航Item选中背景色
    pv.itemSelectedBGC = "transparent";
    Object.defineProperty(pv, "ItemSelectedBGC", {
        get: function () {
            return pv.itemSelectedBGC;
        },
        set: function (v) {
            pv.itemSelectedBGC = v;
        }
    });


    //TODO:导航Item宽度
    pv.itemWidth = "";
    Object.defineProperty(pv, "ItemWidth", {
        get: function () {
            return pv.itemWidth;
        },
        set: function (v) {
            pv.itemWidth = v;
            pv.RefreshDisplay();
        }
    });


    //TODO:导航Item高度
    pv.itemHeight = "";
    Object.defineProperty(pv, "ItemHeight", {
        get: function () {
            return pv.itemHeight;
        },
        set: function (v) {
            pv.itemHeight = v;
            pv.RefreshDisplay();
        }
    });


    //TODO:导航Item圆角
    pv.itemBorderR = "0px";
    Object.defineProperty(pv, "ItemBorderR", {
        get: function () {
            return pv.itemBorderR;
        },
        set: function (v) {
            pv.itemBorderR = v;
            pv.RefreshDisplay();
        }
    });


    //TODO:导航Item边框
    pv.itemBorder = "";
    Object.defineProperty(pv, "ItemBorder", {
        get: function () {
            return pv.itemBorder;
        },
        set: function (v) {
            pv.itemBorder = v;
            pv.RefreshDisplay();
        }
    });


    //TODO:导航Item默认前景颜色
    pv.itemDefaultColor = "#2c2f30";
    Object.defineProperty(pv, "ItemDefaultColor", {
        get: function () {
            return pv.itemDefaultColor;
        },
        set: function (v) {
            pv.itemDefaultColor = v;
            pv.RefreshDisplay();
        }
    });

    //TODO:导航Item选中前景颜色
    pv.itemSelectColor = "#2a27ff";
    Object.defineProperty(pv, "ItemSelectColor", {
        get: function () {
            return pv.itemSelectColor;
        },
        set: function (v) {
            pv.itemSelectColor = v;
        }
    });


    //TODO:排列方式  水平排列 horizontal、垂直排列 vertical
    pv.itemArrangeDir = "vertical";
    Object.defineProperty(pv, "ItemArrangeDir", {
        get: function () {
            return pv.itemArrangeDir;
        },
        set: function (v) {
            pv.itemArrangeDir = v;
            pv.RefreshDisplay();
        }
    });

    //TODO:图像宽、高
    pv.itemImageSize = "32px 32px";
    Object.defineProperty(pv, "ItemImageSize", {
        get: function () {
            return pv.itemImageSize;
        },
        set: function (v) {
            pv.itemImageSize = v;

            //去掉前后空格
            pv.itemImageSize = pv.itemImageSize.replace(/(^\s*)|(\s*$)/g, "");
            var imgSizes = pv.itemImageSize.split(" ");

            // var imgW = "",imgH = "";
            if(imgSizes && imgSizes.length>0){
                if(imgSizes.length==1){
                    pv.imgW = imgSizes[0];
                    pv.imgH = imgSizes[0];
                }else {
                    pv.imgW = imgSizes[0];
                    pv.imgH = imgSizes[1];
                }
            }else {
                pv.imgW = "32px";
                pv.imgH = "32px";
            }

            pv.RefreshDisplay();
        }
    });

    //设置选中某一项  默认选中第一项
    pv.selectIndex = 0;
    Object.defineProperty(pv, "SelectIndex", {
        get: function () {
            return pv.selectIndex*1;
        },
        set: function (v) {
            var val = v*1;
            if(isNaN(val)==true){
                val = 0;
            }
            pv.selectIndex = val;
            pv.SelectedIndex(pv.selectIndex);
        }
    });

/********         属性设置 end              **/


    //TODO:每行显示列数
    pv.columnCount = 4;


    //TODO:重新排列项目
    pv.IsBeginUpdate = false;
    pv.ReArrayItems = function () {
        if (pv.IsBeginUpdate)
            return;


        for (var i = pv.PagesPanel.children.length-1; i>=0; i--) {

            var citem = pv.PagesPanel.children[i];
            if (citem.className=="VDE_Design_ControlDP")
                continue;

            pv.PagesPanel.removeChild(citem);
        }


        pv.Items.forEach(function (item) {
            pv.PagesPanel.appendChild(item.VisualElement);
        });

        pv.IsBeginUpdate = false;

    }

    pv.BeginUpdate = function () {

        pv.IsBeginUpdate = true;
    }

    pv.EndUpdate = function () {
        pv.IsBeginUpdate = false;
        pv.ReArrayItems();
    }

    pv.AddControl = function (c) {

        pv.AddItem(c);

    }

    pv.InsertControl = function (c, tc, pos) {

        var idx = pv.Controls.indexOf(tc);

        if (idx < 0)
            pv.AddControl(c);
        else {

            if (pos == undefined || pos == 0) {
                pv.Controls.splice(idx, 0, c);
                pv.Items.splice(idx, 0, c);
                tc.VisualElement.insertAdjacentElement("beforeBegin", c.VisualElement);
            }
            else {

                pv.Controls.splice(idx + 1, 0, c);
                pv.Items.splice(idx + 1, 0, c);
                tc.VisualElement.insertAdjacentElement("afterEnd", c.VisualElement);


            }
            c.FormContext = pv.FormContext;
            c.DataContext = pv.DataContext;

        }
        c.Height = "";
        c.Width = "";
        c.Parent = pv;

    }


    //TODO:添加Item
    pv.AddItem = function (item) {
        pv.Items.Add(item);
        pv.Controls.Add(item);

        item.TabPageView = pv;
        item.DataContext = pv.dataContext;
        item.FormContext = pv.FormContext;

        if(item.SetFormContext!=undefined && item.SetFormContext!=null)
            item.SetFormContext(pv.FormContext);

        if (pv.DesignTime) {
            pv.DesignView.SetDesignTimeMode(item, pv);
        }

        pv.ReArrayItems();

    }

    //TODO:移除Item
    pv.RemoveItem = function (item) {
        pv.Items.Remove(item);
        pv.Controls.Remove(item);

        item.DataContext =undefined;
        item.FormContext = undefined;

        pv.ReArrayItems();
    }

    pv.Remove = function (item) {
        pv.RemoveItem(item);
    }


    //刷新显示样式
    pv.RefreshDisplay = function () {

        if(pv.Pages && Array.isArray(pv.Pages) && pv.Pages.length>0){
            pv.Pages.forEach(function (pvitem) {

                // console.log(pvitem.dataContext[pv.TextMember]);
                pvitem.Title = pvitem.dataContext[pv.TextMember];
                pvitem.PageUri = pvitem.dataContext[pv.PageUriMember];
                pvitem.ImageUrl = pvitem.dataContext[pv.ImgMember];
                pvitem.SubTitle = pvitem.dataContext[pv.SubTitleMember];

                pvitem.Width = pv.itemWidth;
                pvitem.Height = pv.itemHeight;

                //设置显示色
                pvitem.BackgroundColor = pv.itemDefaultBGC;
                pvitem.Color = pv.itemDefaultColor;

                //设置图片宽高
                pvitem.ImgWidth = pv.imgW;
                pvitem.ImgHeight = pv.imgH;

                //设置边框
                pvitem.BorderRadius = pv.itemBorderR;
                pvitem.BorderDisplay = pv.itemBorder;

                //设置排列方式
                pvitem.ArrangeDir = pv.itemArrangeDir;

            })

            var i = pv.SelectIndex;
            if(i>=pv.Pages.length || i<0 || isNaN(i)==true){
                i = 0;
            }
            var item = pv.Pages[i];
            pv.SetClickItemStyle(item)
        }


    }

    //创建页面
    pv.CreatePages = function () {
        pv.PagesPanel.innerHTML = "";
        pv.Pages = [];

        if(Array.isArray(pv.itemSource)){
            var itemCount = pv.itemSource.length;

            var itemwidth ="calc("+ (100 / (itemCount * 1.0))+"% - 2px)";


            pv.itemWidth = parseFloat(pv.itemWidth)>0 ? pv.itemWidth : itemwidth;
            pv.itemHeight = parseFloat(pv.itemHeight)>0 ? pv.itemHeight :"100%";



            for(var i=0;i<pv.itemSource.length;i++){
                var item = pv.itemSource[i];
                var pvitem = new DBFX.Web.Controls.TabPageViewItem(pv);

                pvitem.dataContext = item;

                //TODO:设置pvitem显示样式
                pvitem.Title = eval("item."+pv.TextMember);
                pvitem.PageUri = eval("item."+pv.PageUriMember);
                pvitem.ImageUrl = eval("item."+pv.ImgMember);
                pvitem.SubTitle = eval("item."+pv.SubTitleMember);

                pvitem.Width = pv.itemWidth;
                pvitem.Height = pv.itemHeight;

                //设置显示色
                pvitem.BackgroundColor = pv.itemDefaultBGC;
                pvitem.Color = pv.itemDefaultColor;

                //设置图片宽高
                pvitem.ImgWidth = pv.imgW;
                pvitem.ImgHeight = pv.imgH;

                //设置边框
                pvitem.BorderRadius = pv.itemBorderR;
                pvitem.BorderDisplay = pv.itemBorder;

                //设置排列方式
                pvitem.ArrangeDir = pv.itemArrangeDir;


                pv.PagesPanel.appendChild(pvitem.VisualElement);
                pv.Pages.push(pvitem);
            }
            pv.SelectedIndex(pv.SelectIndex);

        }else {

            return;
        }
    }

    //设置选中某一项
    pv.SelectedIndex = function (index) {
        var i = index*1;
        if(pv.Pages.length){
            if(i>=pv.Pages.length || i<0 || isNaN(i)==true){
                i = 0;
            }

            var item = pv.Pages[i];

            pv.OnItemClick(item);
        }

    }

    //设置点击item样式
    pv.SetClickItemStyle = function (item) {
        //当前点击样式
        pv.Pages.forEach(function (pitem) {
            pitem.IndicatorC = "transparent";
            pitem.Color = pv.itemDefaultColor;
            pitem.BackgroundColor = pv.itemDefaultBGC;
            pitem.ImageUrl = pitem.dataContext[pv.imgMember];
        });


        item.IndicatorC = pv.itemSelectColor;
        item.Color = pv.itemSelectColor;
        item.BackgroundColor = pv.itemSelectedBGC;
        item.ImageUrl = item.dataContext[pv.selectedImgMember];
    }

    pv.OnItemClick = function (item) {

        pv.SetClickItemStyle(item);

        //遍历所有item确定点击item的index
        for(var i = 0;i<pv.Pages.length;i++){
            if(item === pv.Pages[i]){
                pv.selectIndex = i;
                break;
            }
        }


        if (pv.ItemClick != undefined && typeof pv.ItemClick =="function")
            pv.ItemClick(item);

        if (pv.ItemClick != undefined && pv.ItemClick.GetType() == "Command") {
            pv.ItemClick.Sender = pv;
            pv.ItemClick.Execute();
        }

        if (item.Command != undefined) {
            item.Command.Sender = item;
            item.Command.Execute();
        }

        if (item.dataContext == undefined)
            item.dataContext = {};

        //展示绑定页面
        //"https://inkstone.dbazure.cn/apps/e1334061f1954b10b25f1deee1c26725/31bb189b41234055a0dc402d5b3d79b3.scrn";
        pv.ppv.PageResourceUri = item.PageUri;

    }

    //数据绑定
    pv.DataBind = function (v) {
        pv.ppv.DataContext = pv.dataContext;
    }

    pv.OnCreateHandle();
    return pv;
}


DBFX.Web.Controls.TabPageViewItem = function (pv) {
    var pvi = new DBFX.Web.Controls.Control("TabPageViewItem");
    pvi.ClassDescriptor.Serializer = "DBFX.Serializer.TabPageViewItemSerializer";
    pvi.VisualElement = document.createElement("DIV");
    pvi.VisualElement.className = "TabPageViewItem";
    pvi.TabPageView = pv;
    pvi.OnCreateHandle();
    pvi.OnCreateHandle = function () {
        pvi.VisualElement.innerHTML = "<IMG class='TabPageViewItemImage'><SPAN class='TabPageViewItemTitle'></SPAN><SPAN class='TabPageViewItemSubTitle'></SPAN><DIV class='TabPageViewItemIndicator'></DIV>";

        //图片
        pvi.Image = pvi.VisualElement.querySelector("IMG.TabPageViewItemImage");
        //标题
        pvi.SpanTitle = pvi.VisualElement.querySelector("SPAN.TabPageViewItemTitle");
        //副标题
        pvi.SpanSubTitle = pvi.VisualElement.querySelector("SPAN.TabPageViewItemSubTitle");
        //选中显示指示器
        pvi.Indicator = pvi.VisualElement.querySelector("DIV.TabPageViewItemIndicator");


        pvi.VisualElement.onmousedown = function (e) {
            pvi.TabPageView.OnItemClick(pvi);
        }

    }


    //显示标题
    Object.defineProperty(pvi, "Title", {
        get: function () {
            return pvi.SpanTitle.innerText;
        },
        set: function (v) {
            if(v)
                pvi.SpanTitle.innerText = v;
        }
    });

    //显示副标题
    Object.defineProperty(pvi, "SubTitle", {
        get: function () {
            return pvi.SpanSubTitle.innerText;
        },
        set: function (v) {
            if(v){
                pvi.SpanSubTitle.className = "TabPageViewItemSubTitle";
                pvi.SpanSubTitle.innerText = v;
            }else {
                pvi.SpanSubTitle.className = "TabPageViewItemSubTitleHidden";
            }
        }
    });

    //显示图片 如为空 则不显示图片控件
    Object.defineProperty(pvi, "ImageUrl", {
        get: function () {
            return pvi.Image.src;
        },
        set: function (v) {
            if(v){
                pvi.Image.className = "TabPageViewItemImage";
                pvi.Image.src = v;
            }else {
                pvi.Image.className = "TabPageViewItemImageHidden";
            }

        }
    });

    //页面资源
    Object.defineProperty(pvi, "PageUri", {
        get: function () {
            return pvi.pageUri;
        },
        set: function (v) {
            pvi.pageUri = v;
        }
    });

    //排列方向
    pvi.arrangeDir = "vertical";
    Object.defineProperty(pvi, "ArrangeDir", {
        get: function () {
            return pvi.arrangeDir;
        },
        set: function (v) {
            pvi.arrangeDir = v;
            switch (v){
                case "vertical"://垂直排列
                    pvi.VisualElement.className = "TabPageViewItem_Vertical";
                    break;
                case "horizontal"://水平排列
                    pvi.VisualElement.className = "TabPageViewItem_Horizontal";
                    break;
                default:
                    break;
            }
        }
    });


    pvi.SetColor = function (v) {
        pvi.SpanTitle.style.color = v;
        pvi.SpanSubTitle.style.color = v;
    }

    //指示器颜色
    pvi.indicatorC = "transparent";
    Object.defineProperty(pvi, "IndicatorC", {
        get: function () {
            return pvi.indicatorC;
        },
        set: function (v) {
            pvi.indicatorC = v;
            // pvi.Indicator.className = "TabPageViewItemIndicator";
            // pvi.Indicator.style.width = "0px";
            pvi.Indicator.style.backgroundColor = v;

            // pvi.Indicator.className = "TabPageViewItemIndicator_Current";
            // pvi.Indicator.style.width = "100%";
        }
    });

    //图片显示宽、高
    pvi.imgWidth = "32px";
    Object.defineProperty(pvi, "ImgWidth", {
        get: function () {
            return pvi.imgWidth;
        },
        set: function (v) {
            pvi.imgWidth = v;
            pvi.Image.style.width = v;
        }
    });

    pvi.imgHeight = "32px";
    Object.defineProperty(pvi, "ImgHeight", {
        get: function () {
            return pvi.imgHeight;
        },
        set: function (v) {
            pvi.imgHeight = v;
            pvi.Image.style.height = v;
        }
    });

    //边框显示
    pvi.borderDisplay = "";
    Object.defineProperty(pvi, "BorderDisplay", {
        get: function () {
            return pvi.borderDisplay;
        },
        set: function (v) {
            pvi.borderDisplay = v;
            pvi.VisualElement.style.border = v;
        }
    });

    pvi.OnCreateHandle();
    return pvi;
}

DBFX.Serializer.TabPageViewSerializer = function () {
    //系列化
    this.Serialize = function (c, xe, ns) {

        if(Array.isArray(c.ItemSource))
            DBFX.Serializer.SerialProperty("ItemSourceString", JSON.stringify(c.ItemSource), xe);


        DBFX.Serializer.SerialProperty("TextMember", c.TextMember, xe);
        DBFX.Serializer.SerialProperty("SubTitleMember", c.SubTitleMember, xe);
        DBFX.Serializer.SerialProperty("ImgMember", c.ImgMember, xe);
        DBFX.Serializer.SerialProperty("SelectedImgMember", c.SelectedImgMember, xe);
        DBFX.Serializer.SerialProperty("PageUriMember", c.PageUriMember, xe);
        DBFX.Serializer.SerialProperty("SelectIndex", c.SelectIndex, xe);
        DBFX.Serializer.SerialProperty("NaviBarPos", c.NaviBarPos, xe);
        DBFX.Serializer.SerialProperty("NaviBarH", c.NaviBarH, xe);
        DBFX.Serializer.SerialProperty("NaviBarBGC", c.NaviBarBGC, xe);
        DBFX.Serializer.SerialProperty("ItemDefaultBGC", c.ItemDefaultBGC, xe);
        DBFX.Serializer.SerialProperty("ItemSelectedBGC", c.ItemSelectedBGC, xe);
        DBFX.Serializer.SerialProperty("ItemWidth", c.ItemWidth, xe);
        DBFX.Serializer.SerialProperty("ItemHeight", c.ItemHeight, xe);
        DBFX.Serializer.SerialProperty("ItemBorderR", c.ItemBorderR, xe);
        DBFX.Serializer.SerialProperty("ItemBorder", c.ItemBorder, xe);
        DBFX.Serializer.SerialProperty("ItemDefaultColor", c.ItemDefaultColor, xe);
        DBFX.Serializer.SerialProperty("ItemSelectColor", c.ItemSelectColor, xe);
        DBFX.Serializer.SerialProperty("ItemArrangeDir", c.ItemArrangeDir, xe);
        DBFX.Serializer.SerialProperty("ItemImageSize", c.ItemImageSize, xe);

        //序列化方法
        DBFX.Serializer.SerializeCommand("ItemClick", c.ItemClick, xe);

    }

    //反系列化
    this.DeSerialize = function (c, xe, ns) {

        if (c.ItemSourceString != undefined && c.ItemSourceString != null) {
            c.ItemSource = eval(c.ItemSourceString);
            delete c.ItemSourceString;
        }

        DBFX.Serializer.DeSerialProperty("TextMember", c, xe);
        DBFX.Serializer.DeSerialProperty("SubTitleMember", c, xe);
        DBFX.Serializer.DeSerialProperty("ImgMember", c, xe);
        DBFX.Serializer.DeSerialProperty("SelectedImgMember", c, xe);
        DBFX.Serializer.DeSerialProperty("PageUriMember", c, xe);
        DBFX.Serializer.DeSerialProperty("SelectIndex", c, xe);
        DBFX.Serializer.DeSerialProperty("NaviBarPos", c, xe);
        DBFX.Serializer.DeSerialProperty("NaviBarH", c, xe);
        DBFX.Serializer.DeSerialProperty("NaviBarBGC", c, xe);
        DBFX.Serializer.DeSerialProperty("ItemDefaultBGC", c, xe);
        DBFX.Serializer.DeSerialProperty("ItemSelectedBGC", c, xe);
        DBFX.Serializer.DeSerialProperty("ItemWidth", c, xe);
        DBFX.Serializer.DeSerialProperty("ItemHeight", c, xe);
        DBFX.Serializer.DeSerialProperty("ItemBorderR", c, xe);
        DBFX.Serializer.DeSerialProperty("ItemBorder", c, xe);
        DBFX.Serializer.DeSerialProperty("ItemDefaultColor", c, xe);
        DBFX.Serializer.DeSerialProperty("ItemSelectColor", c, xe);
        DBFX.Serializer.DeSerialProperty("ItemArrangeDir", c, xe);
        DBFX.Serializer.DeSerialProperty("ItemImageSize", c, xe);


        //对方法反序列化
        DBFX.Serializer.DeSerializeCommand("ItemClick", xe, c);
    }


}

DBFX.Design.TypeEditors.TPVItemsBuilder = function () {

    var ibuilder = new DBFX.Web.Controls.Button("...", function (e) {

        var form = new DBFX.Web.Forms.Form("选项集合设置", "design/DesignerTemplates/typeeditors//TPVItemSourceBuilder.scrn", function (form) {
            form.DataContext = ibuilder.dataContext;
            var DesignerItemPanel = form.FormControls["DesignerItemPanel"];
            var AddItemButton = form.FormControls["AddItemButton"];
            var RemoveItemButton = form.FormControls["RemoveItemButton"];
            var SaveButton = form.FormControls["SaveButton"];
            var ListView = form.FormControls["ListView"];
            var TPVTitle = form.FormControls["Title"];
            var TPVPageUri = form.FormControls["PageUri"];
            var TPVSubTitle = form.FormControls["SubTitle"];
            var TPVDefaultImg = form.FormControls["DefaultImg"];
            var TPVSelectedImg = form.FormControls["SelectedImg"];


            ListView.SelectedItemChanged = function (listview, item) {
                DesignerItemPanel.DataContext = item.DataContext;
            }

            ListView.ItemSource = form.dataContext.ItemSource;
            AddItemButton.Click = function (e) {
                if (ListView.ItemSource == undefined)
                    ListView.ItemSource = new Array();
                ListView.ItemSource.push({ "Text": TPVTitle.Value,"PageUri": TPVPageUri.Value,"SubTitle": TPVSubTitle.Value,"DefaultImg": TPVDefaultImg.Value,"SelectedImg": TPVSelectedImg.Value});
                ListView.ItemSource = ListView.ItemSource;
            }
            RemoveItemButton.Click = function (e) {
                ListView.ItemSource.Remove(ListView.SelectedItem.dataContext);
                ListView.ItemSource = ListView.ItemSource;
            }

            SaveButton.Click = function (e) {
                ibuilder.dataContext.ItemSource = ListView.ItemSource;
                form.Close();
            }
        });
        form.ShowModal();


    });

    return ibuilder;

}

DBFX.Design.ControlDesigners.TabPageViewDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {
        DBFX.Resources.LoadResource("design/DesignerTemplates/FormDesignerTemplates/TabPageViewDesigner.scrp", function (od) {
            od.DataContext = obdc.dataContext;
            //设计器中绑定事件处理
            od.EventListBox = od.FormContext.Form.FormControls.EventListBox;
            od.EventListBox.ItemSource = [{EventName:"ItemClick",EventCode:undefined,Command:od.dataContext.ItemClick,Control:od.dataContext}];
        }, obdc);

    }

    //事件处理程序
    obdc.DataContextChanged = function (e) {
        obdc.DataBind(e);
        if(obdc.EventListBox != undefined){
            obdc.EventListBox.ItemSource = [{EventName:"ItemClick",EventCode:undefined,Command:obdc.dataContext.ItemClick,Control:obdc.dataContext}];
        }
    }


    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "TabPageView";
    return obdc;
}

