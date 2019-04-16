
app.DynamicModules.M5c204760a56abaa6a514c6c4=function(cmd)
{
    try
    {
        var thisForm=cmd.Sender.FormContext.Form;
        var formControls=cmd.Sender.FormContext.Form.FormControls;
        var data=thisForm.DataContext;
        var a=formControls.tbxStall.TextBox.focus();
        var params={};
        params.Para1=data._id;
        var dareq = new DBFX.Data.DACrequest("SP5bee2eb1470866fffc4f5842", params, app.CurrentApp.EnvironVariables.DBService,"DB_WMSSystem", function (daresp) {
            if (daresp.State == 0) {
                formControls.pnlB.DataContext=daresp.DataObj;
            }
            else{
                DBFX.Web.Forms.MessageBox.Show(daresp.Exception,"消息提示框",function (dialogresult)
                {
                },0,"确定","取消",-1);
            }
        },"DB.FX.Storage.MongoDBService",app.CurrentApp.EnvironVariables.ServiceUrl);
        dareq.Execute();
    }
    catch(ex)
    {
        DBFX.Web.Forms.MessageBox.Show(ex.toString(),"消息提示框",function (dialogresult)
        {
        },0,"确定","取消",-1);
    }
}

app.DynamicModules.M5c204801a56abaa6a514c7eb=function(cmd)
{
    try
    {
        var thisForm=cmd.Sender.FormContext.Form;
        var formControls=cmd.Sender.FormContext.Form.FormControls;
        var data=formControls.pnlB.DataContext;
        var form=thisForm.DataContext;
        var AdviceStallName=formControls.AdviceStallName.Text;
        data.User_id=app.CurrentApp.CurrentUser.LoginUser.User_id;
        data.UserName=app.CurrentApp.CurrentUser.LoginUser.UserName;
        data.Stall_id=formControls.IStallId.Text;
        data.StallName=formControls.IStallName.Text;
        data.AlreadyData=form.AlreadyData;
        data.ResidueData=form.ResidueData;
        if(formControls.IStallId.Text==""){
            DBFX.Web.Forms.MessageBox.Show("请扫描货位码！","消息提示框",function (dialogresult)
            {
            },0,"确定","取消",-1);
            return;
        }
        else {
            if(data.StallName!=AdviceStallName){
                DBFX.Web.Forms.MessageBox.Show("实际货位与分配货位不符，继续操作将以实际货位为准，是否继续操作？","消息提示框",function (dialogresult)
                {
                    if(dialogresult==1){
                        var params={};
                        params.Para1=data;
                        var dareq = new DBFX.Data.DACrequest("SP5bfb47adbdce1973977cd7ae", params, app.CurrentApp.EnvironVariables.DBService,"DB_WMSSystem", function (daresp) {
                            if (daresp.State == 0) {
                                formControls.pnlB.DataContext=daresp.DataObj[0];
                                if(daresp.DataObj.length==0){
                                    formControls.pnlB.DataContext=[];
                                    DBFX.Web.Forms.MessageBox.Show("该订单所有产品已全部上架！","消息提示框",function (dialogresult)
                                    {
                                    },0,"确定","取消",-1);
                                }
                                cmd.Sender.Enabled=false;
                                var f=thisForm.lvReceivStall.RemoveItem(thisForm.lvReceivStall.SelectedItem);
                            }
                            else{
                                DBFX.Web.Forms.MessageBox.Show(daresp.Exception,"消息提示框",function (dialogresult)
                                {
                                },0,"确定","取消",-1);
                            }
                        },"DB.FX.Storage.MongoDBService",app.CurrentApp.EnvironVariables.ServiceUrl);
                        dareq.Execute();
                    }
                },1,"确定","取消",-1);
            }
            else {
                var params={};
                params.Para1=data;
                var dareq = new DBFX.Data.DACrequest("SP5bfb47adbdce1973977cd7ae", params, app.CurrentApp.EnvironVariables.DBService,"DB_WMSSystem", function (daresp) {
                    if (daresp.State == 0) {
                        formControls.pnlB.DataContext=daresp.DataObj[0];
                        if(daresp.DataObj.length==0){
                            formControls.pnlB.DataContext=[];
                            DBFX.Web.Forms.MessageBox.Show("该订单所有产品已全部上架！","消息提示框",function (dialogresult)
                            {
                            },0,"确定","取消",-1);
                        }
                        cmd.Sender.Enabled=false;
                        var f=thisForm.lvReceivStall.RemoveItem(thisForm.lvReceivStall.SelectedItem);
                    }
                    else{
                        DBFX.Web.Forms.MessageBox.Show(daresp.Exception,"消息提示框",function (dialogresult)
                        {
                        },0,"确定","取消",-1);
                    }
                },"DB.FX.Storage.MongoDBService",app.CurrentApp.EnvironVariables.ServiceUrl);
                dareq.Execute();
            }
        }
    }
    catch(ex)
    {
        DBFX.Web.Forms.MessageBox.Show(ex.toString(),"消息提示框",function (dialogresult)
        {
        },0,"确定","取消",-1);
    }
    return;
    thisForm.IAlready.Text=daresp.DataObj.IAlready;
    thisForm.IResidue.Text=daresp.DataObj.IResidue;
    var a=DBFX.Web.NavControls.UIViewController.ActivedViewController.GoBack(1);
}

app.DynamicModules.M5c20484aa56abaa6a514c861=function(cmd)
{
    try
    {
        DBFX.Web.Forms.MessageBox.Show(ex.toString(),"消息提示框",function (dialogresult)
        {
        },0,"确定","取消",-1);
        var formControls=cmd.Sender.FormContext.Form.FormControls;
        var id=formControls.tbxStall.Text;
        var Group_id=app.CurrentApp.CurrentUser.LoginUser.Group_id;
        if(id==""){
            return;
        }
        formControls.Barcode.Text=id;
        var params={};
        params.Para1=id;
        params.Para3=Group_id;
        var dareq = new DBFX.Data.DACrequest("SP5bfceb0fbdce197397835838", params, app.CurrentApp.EnvironVariables.DBService,"DB_WMSSystem", function (daresp) {
            if (daresp.State == 0) {
                try
                {
                    if(daresp.DataObj.Status==1){
                        DBFX.Web.Forms.MessageBox.Show(daresp.DataObj.Message,"消息提示框",function (dialogresult)
                        {
                        },0,"确定","取消",-1);
                        return;
                    }
                    formControls.IStallId.Text=daresp.DataObj.Stall_id;
                    formControls.IStallName.Text=daresp.DataObj.StallName;
                    cmd.Sender.Text="";
                    var a=formControls.tbxStall.TextBox.focus();
                }
                catch(ex)
                {
                    DBFX.Web.Forms.MessageBox.Show(ex.toStrng(),"消息提示框",function (dialogresult)
                    {
                    },0,"确定","取消",-1);
                }
            }
            else{
                DBFX.Web.Forms.MessageBox.Show(daresp.Exception,"消息提示框",function (dialogresult)
                {
                },0,"确定","取消",-1);
            }
        },"DB.FX.Storage.MongoDBService",app.CurrentApp.EnvironVariables.ServiceUrl);
        dareq.Execute();
    }
    catch(ex)
    {
        DBFX.Web.Forms.MessageBox.Show(ex.toStrng(),"消息提示框",function (dialogresult)
        {
        },0,"确定","取消",-1);
    }
}

app.DynamicModules.M5c204854a56abaa6a514c879=function(cmd)
{
    try
    {
        var formControls=cmd.Sender.FormContext.Form.FormControls;
        DBFX.Dbsoft.System.Advance.QR.scan(function(barcode)
        {
            var Tray=barcode;
            formControls.tbxStall.Text=Tray;
        });
    }
    catch(ex)
    {
        DBFX.Web.Forms.MessageBox.Show(ex.toString(),"消息提示框",function (dialogresult)
        {
        },0,"确定","取消",-1);
    }
}

app.DynamicModules.M5c204b82a56abaa6a514ccf0=function(cmd)
{
    try
    {
        var thisForm=cmd.Sender.FormContext.Form;
        var formControls=cmd.Sender.FormContext.Form.FormControls;
        var id=formControls.tbxStall.Text;
        var Group_id=app.CurrentApp.CurrentUser.LoginUser.Group_id;
        if(id==""){
            return;
        }
        formControls.Barcode.Text=id;
        var params={};
        params.Para1=id;
        params.Para2=Group_id;
        var dareq = new DBFX.Data.DACrequest("SP5bfceb0fbdce197397835838", params, app.CurrentApp.EnvironVariables.DBService,"DB_WMSSystem", function (daresp) {
            if (daresp.State == 0) {
                if(daresp.DataObj.Status==1){
                    DBFX.Web.Forms.MessageBox.Show(daresp.DataObj.Message,"消息提示框",function (dialogresult)
                    {
                    },0,"确定","取消",-1);

                    return;
                }
                formControls.IStallId.Text=daresp.DataObj.Stall_id;
                formControls.IStallName.Text=daresp.DataObj.StallName;
                cmd.Sender.Text="";
                var a=formControls.tbxStall.TextBox.focus();
            }
        },"DB.FX.Storage.MongoDBService",app.CurrentApp.EnvironVariables.ServiceUrl);
        dareq.Execute();
    }
    catch(ex)
    {
        DBFX.Web.Forms.MessageBox.Show(ex.toString(),"消息提示框",function (dialogresult)
        {
        },0,"确定","取消",-1);
    }
}

app.DynamicModules.M5c204ecba56abaa6a514d13b=function(cmd)
{
    try
    {
        DBFX.Web.Forms.MessageBox.Show("123","消息提示框",function (dialogresult)
        {
        },0,"确定","取消",-1);
    }
    catch(ex)
    {
        DBFX.Web.Forms.MessageBox.Show(ex.toString(),"消息提示框",function (dialogresult)
        {
        },0,"确定","取消",-1);
    }
}

app.DynamicModules.M5c204f19a56abaa6a514d1cb=function(cmd)
{
    DBFX.Web.Forms.MessageBox.Show("123","消息提示框",function (dialogresult)
    {
    },0,"确定","取消",-1);
}


