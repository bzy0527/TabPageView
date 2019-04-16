DBFX.Design.ControlDesigners.ListBoxDesigner = function () {

    var obdc = new DBFX.Web.Controls.GroupPanel();
    obdc.OnCreateHandle();
    obdc.OnCreateHandle = function () {

        obdc.Label0 = new DBFX.Web.Controls.Label("项目成员:");
        obdc.Label0.Margin = "2px 2px 2px 16px";
        obdc.Label0.Float = "left";
        obdc.ItemSourceMemberText = new DBFX.Web.Controls.TextBox("", "");
        obdc.ItemSourceMemberText.Margin = "2px";
        obdc.ItemSourceMemberText.Display = "block";
        obdc.ItemSourceMemberText.Height = "26px";
        obdc.ItemSourceMemberText.DataBindings = { Path: "ItemSourceMember", Mode: "TwoWay" };
        obdc.AddControl(obdc.Label0);
        obdc.AddControl(obdc.ItemSourceMemberText);

        obdc.Label = new DBFX.Web.Controls.Label("下拉选项:");
        obdc.Label.Margin = "2px 2px 2px 16px";
        obdc.Label.Float = "left";
        obdc.ItemsBuilder = new DBFX.Design.TypeEditors.ItemsBuilder();
        obdc.ItemsBuilder.Margin = "2px";
        obdc.ItemsBuilder.Display = "block";
        obdc.ItemsBuilder.Height = "26px";
        obdc.AddControl(obdc.Label);
        obdc.AddControl(obdc.ItemsBuilder);

        obdc.Label1 = new DBFX.Web.Controls.Label("默认选项:");
        obdc.Label1.Margin = "2px 2px 2px 16px";
        obdc.Label1.Float = "left";
        obdc.SelectedText = new DBFX.Web.Controls.TextBox("", "");
        obdc.SelectedText.Margin = "2px";
        obdc.SelectedText.Display = "block";
        obdc.SelectedText.Height = "26px";
        obdc.SelectedText.DataBindings = { Path: "SelectedValue", Mode: "TwoWay" };
        obdc.AddControl(obdc.Label1);
        obdc.AddControl(obdc.SelectedText);

        obdc.Label2 = new DBFX.Web.Controls.Label("显示属性:");
        obdc.Label2.Margin = "2px 2px 2px 16px";
        obdc.Label2.Float = "left";
        obdc.DMemberText = new DBFX.Web.Controls.TextBox("", "");
        obdc.DMemberText.Margin = "2px";
        obdc.DMemberText.Display = "block";
        obdc.DMemberText.Height = "26px";
        obdc.DMemberText.DataBindings = { Path: "DisplayMember", Mode: "TwoWay" };
        obdc.AddControl(obdc.Label2);
        obdc.AddControl(obdc.DMemberText);

        obdc.Label3 = new DBFX.Web.Controls.Label("取值属性:");
        obdc.Label3.Margin = "2px 2px 2px 16px";
        obdc.Label3.Float = "left";
        obdc.ValueMemberText = new DBFX.Web.Controls.TextBox("", "");
        obdc.ValueMemberText.Margin = "2px";
        obdc.ValueMemberText.Display = "block";
        obdc.ValueMemberText.Height = "26px";
        obdc.ValueMemberText.DataBindings = { Path: "ValueMember", Mode: "TwoWay" };
        obdc.AddControl(obdc.Label3);
        obdc.AddControl(obdc.ValueMemberText);


    }


    obdc.HorizonScrollbar = "hidden";
    obdc.OnCreateHandle();
    obdc.Class = "VDE_Design_ObjectGeneralDesigner";
    obdc.Text = "列表设置";
    return obdc;

}