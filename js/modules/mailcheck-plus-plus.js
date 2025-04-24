/*
 * Mailcheck https://github.com/mailcheck/mailcheck
 * Author
 * Derrick Ko (@derrickko)
 * Clemens Schneider (@gartenkralle)
 *
 * Released under the MIT License.
 *
 * v 1.1.2
 */

class Mailcheck {
  constructor() {
    this.domainThreshold = 2;
    this.secondLevelThreshold = 2;
    this.topLevelThreshold = 2;

    this.defaultDomains = ['msn.com', 'bellsouth.net', 'telus.net', 'comcast.net', 'optusnet.com.au', 
      'earthlink.net', 'qq.com', 'sky.com', 'icloud.com', 'mac.com', 'sympatico.ca', 'googlemail.com',
      'att.net', 'xtra.co.nz', 'web.de', 'cox.net', 'gmail.com', 'ymail.com', 'aim.com', 'rogers.com', 
      'verizon.net', 'rocketmail.com', 'google.com', 'optonline.net', 'sbcglobal.net', 'aol.com', 'me.com', 
      'btinternet.com', 'charter.net', 'shaw.ca'];

    this.defaultSecondLevelDomains = ["yahoo", "hotmail", "mail", "live", "outlook", "gmx"];

    this.defaultTopLevelDomains = ["com", "com.au", "com.tw", "ca", "co.nz", "co.uk", "de", "fr", "it", "ru", 
      "net", "org", "edu", "gov", "jp", "nl", "kr", "se", "eu", "ie", "co.il", "us", "at", "be", "dk", "hk", 
      "es", "gr", "ch", "no", "cz", "in", "net.au", "info", "biz", "mil", "co.jp", "sg", "hu", "uk"];
  }

  run(opts) {
    opts.domains = opts.domains || this.defaultDomains;
    opts.secondLevelDomains = opts.secondLevelDomains || this.defaultSecondLevelDomains;
    opts.topLevelDomains = opts.topLevelDomains || this.defaultTopLevelDomains;
    opts.distanceFunction = opts.distanceFunction || this.sift4Distance;

    const defaultCallback = (result) => result;
    const suggestedCallback = opts.suggested || defaultCallback;
    const emptyCallback = opts.empty || defaultCallback;

    const result = this.suggest(this.encodeEmail(opts.email), opts.domains, opts.secondLevelDomains, opts.topLevelDomains, opts.distanceFunction);

    return result ? suggestedCallback(result) : emptyCallback();
  }

  suggest(email, domains, secondLevelDomains, topLevelDomains, distanceFunction) {
    email = email.toLowerCase();

    const emailParts = this.splitEmail(email);

    if (secondLevelDomains && topLevelDomains) {
      if (secondLevelDomains.indexOf(emailParts.secondLevelDomain) !== -1 && topLevelDomains.indexOf(emailParts.topLevelDomain) !== -1) {
        return false;
      }
    }

    let closestDomain = this.findClosestDomain(emailParts.domain, domains, distanceFunction, this.domainThreshold);

    if (closestDomain) {
      if (closestDomain === emailParts.domain) {
        return false;
      } 
      else {
        return { address: emailParts.address, domain: closestDomain, full: emailParts.address + "@" + closestDomain };
      }
    }

    const closestSecondLevelDomain = this.findClosestDomain(emailParts.secondLevelDomain, secondLevelDomains, distanceFunction, this.secondLevelThreshold);
    const closestTopLevelDomain = this.findClosestDomain(emailParts.topLevelDomain, topLevelDomains, distanceFunction, this.topLevelThreshold);

    if (emailParts.domain) {
      closestDomain = emailParts.domain;
	    
      let rtrn = false;

      if (closestSecondLevelDomain && closestSecondLevelDomain !== emailParts.secondLevelDomain) {
        closestDomain = closestDomain.replace(emailParts.secondLevelDomain, closestSecondLevelDomain);
        rtrn = true;
      }

      if (closestTopLevelDomain && closestTopLevelDomain !== emailParts.topLevelDomain && emailParts.secondLevelDomain !== '') {
        closestDomain = closestDomain.replace(new RegExp(emailParts.topLevelDomain + "$"), closestTopLevelDomain);
        rtrn = true;
      }

      if (rtrn) {
        return { address: emailParts.address, domain: closestDomain, full: emailParts.address + "@" + closestDomain };
      }
    }

    return false;
  }

  findClosestDomain(domain, domains, distanceFunction, threshold) {
    threshold = threshold || this.topLevelThreshold;
	  
    let dist;
    let minDist = Infinity;
    let closestDomain = null;

    if (!domain || !domains) {
      return false;
    }

    if (!distanceFunction) {
      distanceFunction = this.sift4Distance;
    }

    for (let i = 0; i < domains.length; i++) {
      if (domain === domains[i]) {
        return domain;
      }
	    
      dist = distanceFunction(domain, domains[i]);
	    
      if (dist < minDist) {
        minDist = dist;
        closestDomain = domains[i];
      }
    }

    if (minDist <= threshold && closestDomain !== null) {
      return closestDomain;
    } 
    else {
      return false;
    }
  }

  sift4Distance(s1, s2, maxOffset) {
    if (maxOffset === undefined) {
      maxOffset = 5;
    }

    if (!s1 || !s1.length) {
      if (!s2) {
        return 0;
      }
	    
      return s2.length;
    }

    if (!s2 || !s2.length) {
      return s1.length;
    }

    const l1 = s1.length;
    const l2 = s2.length;

    let c1 = 0;
    let c2 = 0;
    let lcss = 0;
    let local_cs = 0;
    let trans = 0;
    let offset_arr = [];

    while ((c1 < l1) && (c2 < l2)) {
      if (s1.charAt(c1) === s2.charAt(c2)) {
        local_cs++;
	      
        let isTrans = false;

        let i = 0;
	      
        while (i < offset_arr.length) {
          let ofs = offset_arr[i];
		
          if (c1 <= ofs.c1 || c2 <= ofs.c2) {
            isTrans = Math.abs(c2 - c1) >= Math.abs(ofs.c2 - ofs.c1);
		  
            if (isTrans) {
              trans++;
            } 
	    else {
              if (!ofs.trans) {
                ofs.trans = true;
                trans++;
              }
            }
		  
            break;
          } 
	  else {
            if (c1 > ofs.c2 && c2 > ofs.c1) {
              offset_arr.splice(i, 1);
            } 
	    else {
              i++;
            }
          }
        }
	      
        offset_arr.push({
          c1,
          c2,
          trans: isTrans
        });
      } 
      else {
        lcss += local_cs;
        local_cs = 0;
	      
        if (c1 !== c2) {
          c1 = c2 = Math.min(c1, c2);
        }
	      
        for (let j = 0; j < maxOffset && (c1 + j < l1 || c2 + j < l2); j++) {
          if ((c1 + j < l1) && (s1.charAt(c1 + j) === s2.charAt(c2))) {
            c1 += j - 1;
            c2--;
            break;
          }
		
          if ((c2 + j < l2) && (s1.charAt(c1) === s2.charAt(c2 + j))) {
            c1--;
            c2 += j - 1;
            break;
          }
        }
      }
	    
      c1++;
      c2++;
	    
      if ((c1 >= l1) || (c2 >= l2)) {
        lcss += local_cs;
        local_cs = 0;
        c1 = c2 = Math.min(c1, c2);
      }
    }
	  
    lcss += local_cs;
	  
    return Math.round(Math.max(l1, l2) - lcss + trans);
  }

  splitEmail(email) {
    email = email !== null ? (email.replace(/^\s*/, '').replace(/\s*$/, '')) : null;
	  
    const parts = email.split('@');

    if (parts.length < 2) {
      return false;
    }

    for (let i = 0; i < parts.length; i++) {
      if (parts[i] === '') {
        return false;
      }
    }

    const domain = parts.pop();
    const domainParts = domain.split('.');
	  
    let sld = '';
    let tld = '';

    if (domainParts.length === 0) {
      return false;
    } 
    else if (domainParts.length === 1) {
      tld = domainParts[0];
    } 
    else {
      sld = domainParts[0];
	    
      for (let j = 1; j < domainParts.length; j++) {
        tld += domainParts[j] + '.';
      }
	    
      tld = tld.substring(0, tld.length - 1);
    }

    return {
      topLevelDomain: tld,
      secondLevelDomain: sld,
      domain: domain,
      address: parts.join('@')
    };
  }

  encodeEmail(email) {
    let result = encodeURI(email);
	  
    result = result.replace('%20', ' ').replace('%25', '%').replace('%5E', '^')
                   .replace('%60', '`').replace('%7B', '{').replace('%7C', '|')
                   .replace('%7D', '}');
    return result;
  }
}

export default Mailcheck;
