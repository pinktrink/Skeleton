/* 
* Skeleton V1.0.3
* Copyright 2011, Dave Gamache
* www.getskeleton.com
* Free to use under the MIT license.
* http://www.opensource.org/licenses/mit-license.php
* 7/17/2011
* un-jQuerified by Eric Kever
*/	

(function(){
	var Skeleton = {
		getElementsByClassName : function(context, cls){
			if(context.getElementsByClassName){
				return context.getElementsByClassName(cls);
			}
			
			var ele = context.getElementsByTagName("*"),
				ret = [],
				current,
				classes;
			
			for(var i = 0, j = ele.length; i < j; i++){
				current = ele[i];
				classes = (current.getAttribute("className") || current.className).split(" ");
				for(var k = 0, l = classes.length; k < l; k++){
					if(classes[k] === cls){
						ret.push(current);
						break;
					}
				}
			}
			
			return ret;
		},
		
		filterTag : function(list, tag){
			if(tag.push){
				var exists = false;
				for(var i = 0, j = tag.length; i < j; i++){
					for(var k = 0, l = list.length; k < l; k++){
						if(list[k].tagName === tag[i]){
							exists = true;
							break;
						}
					}
					if(exists === true){
						list.splice(k, 1);
					}
				}
			}else{
				for(var k = 0, l = list.length; k < l; k++){
					if(list[k].tagName === tag){
						list.splice(k, 1);
						break;
					}
				}
			}
			
			return list;
		},
		
		addClass : function(element, name){
			var classes = (element.getAttribute("className") || element.className).split(" "),
				exists = false;
			
			if(name.push){
				for(var i = 0, j = name.length; i < j; i++){
					for(var k = 0, l = classes.length; k < l; k++){
						if(classes[k] === name[i]){
							exists = true;
							break;
						}
					}
					if(!exists){
						classes.push(name[i]);
						element.className = classes.join(" ");
					}
				}
			}else{
				for(var k = 0, l = classes.length; k < l; k++){
					if(classes[k] === name){
						exists = true;
						break;
					}
				}
				if(!exists){
					classes.push(name);
					element.className = classes.join(" ");
				}
			}
		},
		
		removeClass : function(element, name){
			var classes = (element.getAttribute("className") || element.className).split(" "),
				exists = false;
			if(name.push){
				for(var i = 0, j = name.length; i < j; i++){
					for(var k = 0, l = classes.length; k < l; k++){
						if(classes[k] === name[i]){
							exists = true;
							break;
						}
					}
					if(exists){
						classes.splice(k, 1);
						element.className = classes.join(" ");
					}
				}
			}else{
				for(var k = 0, l = classes.length; k < l; k++){
					if(classes[k] === name){
						exists = true;
						break;
					}
				}
				if(exists){
					classes.splice(k, 1);
					element.className = classes.join(" ");
				}
			}
		},
		
		swapClass : function(element, from, to){
			Skeleton.removeClass(element, from);
			Skeleton.addClass(element, to);
		},
		
		addListener : function(element, on, fn, last){
			last = (last || false);
			var BH;
			
			if(window.addEventListener){  //AddEventListener takes precedence here
				BH = "addEventListener";
			}else if(window.attachEvent){
				BH = "attachEvent";
				on = "on" + on;
			}
			
			element[BH](on, function(e){
				var event = e || window.event;
				return fn.call(element, event);  //Force it to call the handler in the proper context (IE 7 & 8 do not)
			}, last);
		},
		
		doFancyExpensiveTabThings : function(){
			var tabs = Skeleton.filterTag(Skeleton.getElementsByClassName(document, "tabs"), "ul");
			
			for(var i = 0, j = tabs.length; i < j; i++){
				(function(){
					var tabNum = i,
						tabList = tabs[tabNum].getElementsByTagName("li");
					
					for(var k = 0, l = tabList.length; k < l; k++){
						Skeleton.addListener(tabList[k].getElementsByTagName("a")[0], "click", function(e){
							var contentLocation = this.href.substr(this.href.indexOf("#")) + "Tab",
								contentElement,
								siblings;
							
							if(contentLocation.charAt(0) === "#"){
								if(e.preventDefault){
									e.preventDefault();
								}else{
									e.returnValue = false;
									e.cancelBubble = true;
								}
								
								for(var m = 0; m < k; m++){
									Skeleton.removeClass(tabList[m].getElementsByTagName("a")[0], "active");
								}
								
								Skeleton.addClass(this, "active");
								
								contentElement = Skeleton.getElementsByClassName(Skeleton.getElementsByClassName(tabs[tabNum].parentNode, "tabs-content")[0], contentLocation.substr(1))[0];
								Skeleton.addClass(contentElement, "active");
								
								siblings = contentElement.parentNode.getElementsByTagName("li");
								for(var m = 0, n = siblings.length; m < n; m++){
									if(siblings[m] !== contentElement){
										Skeleton.removeClass(siblings[m], "active");
									}
								}
							}
							return false;
						});
					}
				})();
			}
		},
		
		
		
		html5 : {
			form : {
				managedElements : [],
				inputElements : [],
				
				create : {
					color : function(){
						
					},
					
					email : function(){
						
					},
					
					url : function(){
						
					},
					
					number : function(){
						
					},
					
					range : function(){
						
					},
					
					date : function(){
						
					},
					
					month : function(){
						
					},
					
					week : function(){
						
					},
					
					time : function(){
						
					},
					
					datetime : function(){
						
					},
					
					search : function(){
						
					},
					
					datetime_local : function(){
						
					},
					
					text : function(element){
						if(element.getAttribute("placeholder") !== null){
							Skeleton.html5.form.textPlaceholder(element);
						}
					},
					
					password : function(element){
						if(element.getAttribute("placeholder") !== null){
							Skeleton.html5.form.passPlaceholder(element);
						}
					}
				},
				
				textPlaceholder : function(element){
					if(element.value === ""){
						element.value = element.getAttribute("placeholder");
						Skeleton.addClass(element, "skel-placeholder");
					}
					element.Skeleton.hasChanged = false;
					
					Skeleton.addListener(element, "focus", function(){
						if(!this.Skeleton.hasChanged){
							this.value = "";
							Skeleton.removeClass(this, "skel-placeholder");
						}
					});
					
					Skeleton.addListener(element, "blur", function(){
						if(this.value === ""){
							this.value = this.getAttribute("placeholder");
							Skeleton.addClass(this, "skel-placeholder");
							this.Skeleton.hasChanged = false;
						}
					});
					
					Skeleton.addListener(element, "keyup", function(){
						this.Skeleton.hasChanged = true;
					});
				},
				
				passPlaceholder : function(element){
					var tempElement = document.createElement("input"),
						passElement = element;
					
					tempElement.value = passElement.getAttribute("placeholder");
					tempElement.setAttribute("type", "text");
					Skeleton.addClass(tempElement, ["skel-placeholder", "skel-placeholder-hidden"]);
					Skeleton.addClass(passElement, "skel-placeholder-shown");
					passElement.parentNode.insertBefore(tempElement, (passElement.nextSibling || passElement));
					
					if(element.value === ""){
						Skeleton.swapClass(tempElement, "skel-placeholder-hidden", "skel-placeholder-shown");
						Skeleton.swapClass(passElement, "skel-placeholder-shown", "skel-placeholder-hidden");
					}
					passElement.Skeleton.hasChanged = false;
					
					Skeleton.addListener(tempElement, "focus", function(){
						if(!passElement.Skeleton.hasChanged){
							Skeleton.swapClass(passElement, "skel-placeholder-hidden", "skel-placeholder-shown");
							Skeleton.swapClass(this, "skel-placeholder-shown", "skel-placeholder-hidden");
							passElement.focus();
						}
					});
					
					Skeleton.addListener(passElement, "blur", function(){
						if(this.value === ""){
							Skeleton.swapClass(tempElement, "skel-placeholder-hidden", "skel-placeholder-shown");
							Skeleton.swapClass(this, "skel-placeholder-shown", "skel-placeholder-hidden");
							this.Skeleton.hasChanged = false;
						}
					});
					
					Skeleton.addListener(passElement, "keyup", function(){
						this.Skeleton.hasChanged = true;
					});
				}
			},
			
			loader : function(){
				var type,
					inputs = Skeleton.html5.form.inputElements = document.getElementsByTagName("input");
				
				for(var i = 0, j = inputs.length; i < j; i++){
					inputs[i].Skeleton = {};
					if((type = (inputs[i].getAttribute("type") || "").replace(/-/g, "_")) && Skeleton.html5.form.create[type]){
						Skeleton.html5.form.create[type](inputs[i]);
					}
				}
			}
		}
	};
	
	window.Skeleton = Skeleton;
})();

Skeleton.addListener(window, "load", Skeleton.doFancyExpensiveTabThings);
Skeleton.addListener(window, "load", Skeleton.html5.loader);
