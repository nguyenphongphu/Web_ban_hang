﻿using Model.Dao;
using Model.EF;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text.RegularExpressions;
using System.Web;
using System.Web.Mvc;
using Web_ban_hang.Common;

namespace Web_ban_hang.Areas.Admin.Controllers
{
    public class UserController : BaseController
    {
        // GET: Admin/User
        [HttpGet]
        public ActionResult Index()
        {
            var dao = new UserDao();
            var model = dao.ListAllPaging();           
            return View(model);
        }
        [HttpGet]
        public ActionResult Create()
        {
            ViewBag.MACV = new SelectList(new UserDao().chucVus(), "MaCV", "TenCV", "");
            return View();
        }
        [HttpGet]
        public ActionResult Edit(int ID)
        {
            ViewBag.MACV = new SelectList(new UserDao().chucVus(), "MaCV", "TenCV", "");
            var user = new UserDao().ViewDetail(ID);
            return View(user);
        }

        [HttpPost]
        public ActionResult Create(Taikhoan user)
        {
            if (ModelState.IsValid)
            {
                var dao = new UserDao();

                var encryptedMd5Pas = Encryptor.MD5Hash(user.Password);
                user.Password = encryptedMd5Pas;

                int id = dao.Insert(user);
                if (id==1)
                {
                    SetAlert("Them user thành công", "success");
                    return RedirectToAction("Index", "User");
                }            
                else
                {
                    ModelState.AddModelError("", "Thêm user không thành công");
                }
            }
            else
            {
                return View(user);
            }
            return View("Index");

        }

       

        [HttpPost]
        public ActionResult Edits(Taikhoan user)
        {
            if (ModelState.Values.Count()>0)
            {
                var dao = new UserDao();
                if (!string.IsNullOrEmpty(user.Password))
                {
                    var encryptedMd5Pas = Encryptor.MD5Hash(user.Password);
                    user.Password = encryptedMd5Pas;
                }
                var result = dao.Update(user);
                if (result)
                {
                    SetAlert("Sửa user thành công", "success");
                    return RedirectToAction("Index", "User");
                }
                else
                {
                    ModelState.AddModelError("", "Cập nhật user không thành công");
                }
            }
            return View("Index");
        }

        [HttpDelete]
        public ActionResult Delete(int id)
        {
            new UserDao().Delete(id);

            return RedirectToAction("Index");
        }

        [HttpPost]        
        public JsonResult ChangeStatus(long id)
        {
            var result = new UserDao().ChangeStatus(id);
            return Json(new
            {
                status = result
            });
        }
        public  bool isEmail(string inputEmail)
        {
            inputEmail = inputEmail ?? string.Empty;
            string strRegex = @"^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}" +
                  @"\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\" +
                  @".)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$";
            Regex re = new Regex(strRegex);
            if (re.IsMatch(inputEmail))
                return (true);
            else
                return (false);
        }
        private void SetAlert(string message, string type)
        {

            TempData["AlertMessage"] = message;
            if (type == "success")
            {
                TempData["AlertType"] = "alert-success";
            }
            else if (type == "warning")
            {
                TempData["AlertType"] = "alert-warning";
            }
            else if (type == "error")
            {
                TempData["AlertType"] = "alert-danger";
            }

        }
    }
}