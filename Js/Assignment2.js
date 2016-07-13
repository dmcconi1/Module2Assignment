function MenuChoice(selection)
{
    
    document.getElementById("customerlist").style.visibility = "hidden";
    document.getElementById("orderhistory").style.visibility = "hidden";
    document.getElementById("aboutpage").style.visibility = "hidden";
    
    switch (selection)
    {
        case "customerlist":
            document.getElementById("customerlist").style.visibility = "visible";
            GetAllCustomers();
            break;
        case "orderhistory":
            document.getElementById("orderhistory").style.visibility = "visible";
            break;
        case "aboutpage":
            document.getElementById("aboutpage").style.visibility = "visible";
            break;
        case "None":
            break;
        default:
            alert("Please select a different menu option");
    }
}

function GetAllCustomers()
{
    var xmlhttp = new XMLHttpRequest();
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/GetAllCustomers";
    xmlhttp.onreadystatechange = function()
    {
        if (xmlhttp.readyState === 4 && xmlhttp.status === 200)
        {
            var output = JSON.parse(xmlhttp.responseText);
            GenerateOutput(output);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    function GenerateOutput(result)
    {
            var display ="<table><tr><th>Customer ID</th><th>Customer Name</th><th>Customer City</th></tr>";
            var count = 0;
            var customername = "";
            var customerid = "";
            var customercity = "";
            for (count = 0; count < result.GetAllCustomersResult.length; count ++)
            {
               customerid = result.GetAllCustomersResult[count].CustomerID;
               customername = '<a href= "javascript:OrderHistory('+ "'"+ customerid + "');"+'">';
               customername += result.GetAllCustomersResult[count].CompanyName;
               customername += '</a>';
               customercity = result.GetAllCustomersResult[count].City;
                              
               display += "<tr><td>" + customerid + "</td><td>" + customername + "</td><td>" + customercity + "</td></tr>"; 
            }
            display +="</table>";
            document.getElementById("customerinfo").innerHTML = display;
    }
}

function OrderHistory(customerid)
{
    var xmlhttp = new XMLHttpRequest();
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getCustomerOrderHistory/";
    url += customerid;
    xmlhttp.onreadystatechange = function()
    {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            var output = JSON.parse(xmlhttp.responseText);
            GenerateOutput(output);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    function GenerateOutput(result)
    {
        var display = customerid + "<table><thead> :Customer ID </thead><tr><th>Product Names</th><th>Quantities</th></tr>";
        var count = 0;
        for (count=0; count < result.length;count ++)
        {
            var productname= result[count].ProductName;
            var quantity = result[count].Total;
            display += "<tr><td>" + productname + "</td><td>" + quantity + "</td></tr>";
        }
        display += "</table>";
        document.getElementById("customerorder").innerHTML = display;
        MenuChoice("orderhistory");
    }
}

function OrderHistorybyInput(customerid)
{
    customerid = document.getElementById("customerid").value
    var xmlhttp = new XMLHttpRequest();
    var url = "http://bus-pluto.ad.uab.edu/jsonwebservice/service1.svc/getCustomerOrderHistory/";
    url += customerid;
    xmlhttp.onreadystatechange = function()
    {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200)
        {
            var output = JSON.parse(xmlhttp.responseText);
            GenerateOutput(output);
        }
    }
    xmlhttp.open("GET", url, true);
    xmlhttp.send();
    function GenerateOutput(result)
    {
        var display = customerid + "<table><thead> :Customer ID </thead><tr><th>Product Names</th><th>Quantities</th></tr>";
        var count = 0;
        for (count=0; count < result.length;count ++)
        {
            var productname= result[count].ProductName;
            var quantity = result[count].Total;
            display += "<tr><td>" + productname + "</td><td>" + quantity + "</td></tr>";
        }
        display += "</table>";
        document.getElementById("customerorder").innerHTML = display;
        MenuChoice("orderhistory");
    }
}