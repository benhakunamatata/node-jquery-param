// Query String able to use escaping
var query = require('querystring');

function toURL(object, prefix)
{
  var result = '',
    key = '',
    postfix = '&';

  for (var i in object)
  {
    // If not prefix like a[one]...
    if ( ! prefix)
    {
      key = query.escape(i);
    }
    else
    {
      key = prefix + '[' + query.escape(i) + ']';
    }

    // String pass as is...
    if (typeof(object[i]) == 'string')
    {
      result += key + '=' + query.escape(object[i]) + postfix;
    }

    // objectects and arrays pass depper
    else if (typeof(object[i]) == 'object' || Object.prototype.toString.call(object[i]) == '[object Array]')
    {
      result += toURL(object[i], key) + postfix;
    }

    // Other passed stringified
    else if (object[i].toString)
    {
      result += key + '=' + query.escape(object[i].toString()) + postfix;
    }
  }
  // Delete trailing delimiter (&) Yep it's pretty durty way but
  // there was an error gettin length of the objectect;
  result = result.substr(0, result.length - 1);
  return result;
}

module.exports = function(jsonObj){
 return toURL(jsonObj);
};



