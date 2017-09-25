
const dev_api = "https://private-anon-65a255ffbb-ooca.apiary-mock.com";
const production_api = "http://api.ooca.co";

const header = {'Content-Type':'application/json',};
                //'Authorization':Bearer{jwt token}
                //,'content-type':'application/x-www-form-urlencoded'
                //'x-master-key': `smelink1234`,'Cache-Control':['no-cache','no-store','must-revalidate',]

const dev= {    api_feedback:`${dev_api}/api/appointments`,
           }

const production={ api_feedback:`${production_api}/api/appointments`,
                 }

exports.Config =function () {return dev;}



