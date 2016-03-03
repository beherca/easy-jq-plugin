/* ========================================================================
 * Easy jQuery Plugin
 * 
 * 1 $().yourPluginName(): When no parameter is passed in, your plugin is initialized with default configuration
 * 2 $().yourPluginName(obj): When object parameter is passed in, object will be as new configuration to override your default configuration
 * 3 $().yourPluginName(str, obj): Pass string as method name in to call internal method with the name, and object is the configuration object
 * 4 $().yourPluginName(str, [arguments]): Pass string as method name in to call internal method with the name, and array is the configuration arguments
 * 
 * Authors : beherca@gmail.com
 * ======================================================================== 
 */
 ;(function($, window, document, module, undefined) {
     
    var EasyJqPlugin = function(cls, instPrefix){
        if(typeof cls != 'function'){
            throw new Exception('Class must be a function');
        }
        var Wrapper = function(){
            var oriArgs = arguments,
                args = Array.prototype.slice.apply(oriArgs),
                argLength = Array.prototype.slice.apply(oriArgs).length,
                option = _.first(args),
                instanceName = [instPrefix, '_', 'instance'].join('');
            // Handler parameters like $().yourPluginName();
            if(option == null || typeof option == 'undefinded' || (typeof option === 'string' && option.length === 0) || typeof option == 'object'){
                // you can init easy sort to multiple doms
                return this.each(function () {
                    var $me = $(this),
                    instance = $me.data(instanceName);
                    // Initialize Form
                    if (!instance) {
                        $me.data(instanceName, (instance = new cls(this, option)));
                    }else{
                        // if instance already init, this equal to invoke refresh 
                        if(instance['refresh']){
                            return instance['refresh'].apply(instance, args.slice(0, argLength));
                        }
                        return;
                    }
                });
            }
            // Handler parameters like $().yourPluginName('refresh') or  
            // Handler parameters like $().yourPluginName('refresh', {data: 1}) or 
            // Handler parameters like $().yourPluginName('refresh', [arguments]])
            else if(typeof option == 'string'){ 
                var fnName = option;
                if(fnName){
                    var $me = $(this);
                    if($me.length  == 1){
                        var instance = $me.data(instanceName);
                        if(!instance){
                            instance = new cls(this, option);
                        }
                        if(instance[fnName])
                            return instance[fnName].apply(instance, args.slice(1, argLength));
                        else
                            throw new Error('Method Not found');
                    }else{
                        return this.each(function () {
                            var $me = $(this),
                            instance = $me.data(instanceName);
                            // Initialize Form
                            if (!instance) {
                                $me.data(instanceName, (instance = new cls(this, option)));
                            }
                        });
                    }  
                }
            }
            else{
                return null;
            }   
        }
        return Wrapper;
    }

    /* Helper function to register the new plugins*/
    EasyJqPlugin.reg = function(plugin, instancePrefix, events, version){
        if(plugin && instancePrefix){
            plugin = EasyJqPlugin(plugin, instancePrefix);
            events && (plugin.EVENTS = events);
            version && (plugin.version = version);
            $.fn[instancePrefix] = plugin;
        }
        
    }

    module && module.exports && (module.exports = EasyJqPlugin);
    $.fn.easyJqPlugin = EasyJqPlugin;
    window.easyJqPlugin = EasyJqPlugin;
 })
//pass jquery , window, document in to ensure they are not being overrided, module is for commonjs loader like webpack
(jQuery, window, document, module);
