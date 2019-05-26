﻿using Model.Dao;
using Model.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Script.Serialization;
using Web_ban_hang.Models;

namespace Web_ban_hang.Controllers
{
    public class GioHangController : Controller
    {
        private const string CartSession = "CartSession";
        // GET: Cart
        public ActionResult Index()
        {
            var cart = Session[CartSession];
            var list = new List<CartItem>();
            var user = (UserLogin)Session[Web_ban_hang.Common.CommonConstants.USER_SESSION];
            if (user != null)
            {
                var cartserver = new GioHangDao().Listall(user.UserName);
                foreach (var item in cartserver)
                {
                    var cartiem = new CartItem();
                    cartiem.sanpham = item.SanPham;
                    cartiem.Quantity = item.soluong;
                    list.Add(cartiem);
                }
            }
            if (cart != null)
            {                
                list = (List<CartItem>)cart;
            }
            
            return View(list);
        }

        public JsonResult DeleteAll()
        {
            Session[CartSession] = null;
            return Json(new
            {
                status = true
            });
        }

        public JsonResult Delete(long id)
        {
            var sessionCart = (List<CartItem>)Session[CartSession];
            sessionCart.RemoveAll(x => x.sanpham.MaSP == id);
            Session[CartSession] = sessionCart;
            return Json(new
            {
                status = true
            });
        }
        public JsonResult Update(string cartModel)
        {
            var jsonCart = new JavaScriptSerializer().Deserialize<List<CartItem>>(cartModel);
            var sessionCart = (List<CartItem>)Session[CartSession];

            foreach (var item in sessionCart)
            {
                var jsonItem = jsonCart.SingleOrDefault(x => x.sanpham.MaSP == item.sanpham.MaSP);
                if (jsonItem != null)
                {
                    item.Quantity = jsonItem.Quantity;
                }
            }
            Session[CartSession] = sessionCart;
            return Json(new
            {
                status = true
            });
        }
        public ActionResult AddItem(int productId, int quantity)
        {
            var product = new NewDao().ViewDetail(productId);
            var cart = Session[CartSession];
            if (cart != null)
            {
                var list = (List<CartItem>)cart;
                if (list.Exists(x => x.sanpham.MaSP == productId))
                {

                    foreach (var item in list)
                    {
                        if (item.sanpham.MaSP == productId)
                        {
                            item.Quantity += quantity;
                        }
                    }
                }
                else
                {
                    //tạo mới đối tượng cart item
                    var item = new CartItem();
                    item.sanpham = product;
                    item.Quantity = quantity;
                    list.Add(item);
                }
                //Gán vào session
                Session[CartSession] = list;
            }
            else
            {
                //tạo mới đối tượng cart item
                var item = new CartItem();
                item.sanpham = product;
                item.Quantity = quantity;
                var list = new List<CartItem>();
                list.Add(item);
                //Gán vào session
                Session[CartSession] = list;
            }
            return RedirectToAction("Index");
        }
        [HttpGet]
        public ActionResult Payment()
        {
            var cart = Session[CartSession];
            var list = new List<CartItem>();
            if (cart != null)
            {
                list = (List<CartItem>)cart;
            }
            return View(list);
        }

        //[HttpPost]
        //public ActionResult Payment(string shipName, string mobile, string address, string email)
        //{
        //    var order = new GioHang();
        //    order.CreatedDate = DateTime.Now;
        //    order.ShipAddress = address;
        //    order.ShipMobile = mobile;
        //    order.ShipName = shipName;
        //    order.ShipEmail = email;

        //    try
        //    {
        //        var id = new OrderDao().Insert(order);
        //        var cart = (List<CartItem>)Session[CartSession];
        //        var detailDao = new Model.Dao.OrderDetailDao();
        //        decimal total = 0;
        //        foreach (var item in cart)
        //        {
        //            var orderDetail = new OrderDetail();
        //            orderDetail.ProductID = item.Product.ID;
        //            orderDetail.OrderID = id;
        //            orderDetail.Price = item.Product.Price;
        //            orderDetail.Quantity = item.Quantity;
        //            detailDao.Insert(orderDetail);

        //            total += (item.Product.Price.GetValueOrDefault(0) * item.Quantity);
        //        }
        //        string content = System.IO.File.ReadAllText(Server.MapPath("~/assets/client/template/neworder.html"));

        //        content = content.Replace("{{CustomerName}}", shipName);
        //        content = content.Replace("{{Phone}}", mobile);
        //        content = content.Replace("{{Email}}", email);
        //        content = content.Replace("{{Address}}", address);
        //        content = content.Replace("{{Total}}", total.ToString("N0"));
        //        var toEmail = ConfigurationManager.AppSettings["ToEmailAddress"].ToString();

        //        new MailHelper().SendMail(email, "Đơn hàng mới từ OnlineShop", content);
        //        new MailHelper().SendMail(toEmail, "Đơn hàng mới từ OnlineShop", content);
        //    }
        //    catch (Exception ex)
        //    {
        //        //ghi log
        //        return Redirect("/loi-thanh-toan");
        //    }
        //    return Redirect("/hoan-thanh");
        //}

        public ActionResult Success()
        {
            return View();
        }
    }
}