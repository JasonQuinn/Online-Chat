using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Online_Chat.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            ViewBag.Message = "Modify this template to jump-start your ASP.NET MVC application.";
            ViewBag.CurrentUser = User.Identity.Name;
            return View();
        }

        public ActionResult NewChat()
        {
            var routeInfo = new RouteValueDictionary { { "chatRoom", Guid.NewGuid() } };
            return RedirectToAction("Chat", routeInfo);
        }

        public ActionResult Chat(Guid chatRoom)
        {
            ViewBag.CurrentUser = User.Identity.Name;
            ViewBag.ChatRoom = chatRoom;
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your app description page.";

            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";

            return View();
        }
    }
}
