
function GetItemPerWidth()
{
    let _width=window.screen.width;

    if(_width<=320) return 3;
    else if(_width>320&&_width<=410) return 3;
    else if(_width>410&&_width<=510) return 4;
    else if(_width>510&&_width<=610) return 5;
    else if(_width>610&&_width<=710) return 6;
    else if(_width>710&&_width<=810) return 7;
    else if(_width>810&&_width<=910) return 8;
    else if(_width>910&&_width<=1100) return 9;
    else if(_width>1100&&_width<=1350) return 10;
    else 11;
}

function isMobile() 
{
   if(window.screen.width>1023) 
    return false;
   else
    return (navigator.userAgent.match(/(Android|webOS|iPhone|iPad|iPod|BlackBerry|Windows Phone)/i))?true:false;
}