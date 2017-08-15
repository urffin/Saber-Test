using System;
using System.Collections.Generic;
using System.Configuration;
using System.Linq;
using System.Text.RegularExpressions;
using System.Threading;
using System.Web;
using System.Web.Mvc;

namespace TestAspProject.Controllers
{
    public class LogicController : Controller
    {
        [HttpPost]
        public ActionResult Parse(string input)
        {
            try
            {
                Thread.Sleep(new Random().Next(1,5)*100);

                return Json(new
                    {
                        IsValid = new Regex(ConfigurationManager.AppSettings["RegexTemplate"]).IsMatch(input)
                    });
            }
            catch (Exception e)
            {
                return Json(new
                    {
                        IsValid = false,
                        e.Message
                    });
            }
        }
    }
}