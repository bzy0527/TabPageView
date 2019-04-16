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
            var TPVResourceUri = form.FormControls["ResourceUri"];

            ListView.SelectedItemChanged = function (listview, item) {
                DesignerItemPanel.DataContext = item.DataContext;
            }

            ListView.ItemSource = form.dataContext.ItemSource;
            AddItemButton.Click = function (e) {
                if (ListView.ItemSource == undefined)
                    ListView.ItemSource = new Array();
                ListView.ItemSource.push({ "Text": TPVTitle.Value, "ResourceUri": TPVResourceUri.Value});
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