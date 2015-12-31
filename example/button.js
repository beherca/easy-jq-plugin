;(function($, window, document, undefined) {
    'use strict';

    var log = function(str) {
        typeof console != 'undefined' && console.log(str);
    };
    var error = function(str){
        typeof console != 'undefined' && console.error(str);
    }

    var EVENTS = {
        'BEFORE_STATE_CHANGE' : 'easy_button_before_state_change',
        'AFTER_STATE_CHANGE' : 'easy_button_after_state_change'
    };

    var DATA_PREFIX = 'data-';
    var UNDERSCORE_VAR = {variable : 'option'};
    var INSTANCE_PREFIX = 'easyButton';

    //Text Main Logic
    var EasyButton = function(element, conf) {
        var me = this;

        //private default settings
        var defaultConf = {
            tpl: [
                '<button class="easy-btn <%= option.btnClass %>"',  
                'data-toggle="tooltip" data-placement="right" title="<%= option.helpDesc %>">',   
                '   <span class="icon <%= option.icon %>" aria-hidden="true"></span>',     
                '   <span class="text"><%= option.text %></span>',       
                '</button>'
            ].join(''), 
            helpDesc : 'tooltip',
            baseClass : 'btn btn-default',
            target : '.easy-btn',
            metadata: {
                normal : {
                    btn : '',
                    icon : 'glyphicon glyphicon-plus',
                    text : 'Button'
                },
                active : {
                    btn : 'active',
                    icon : 'glyphicon glyphicon-minus',
                    text : 'Button Active'
                },
                loading : {
                    btn : 'loading',
                    icon : 'fa fa-spinner fa-spin',
                    text : 'Button Loading...'
                },
                disabled : {
                    btn : 'disabled',
                    icon : '',
                    text : 'Button Disabled'
                }
            },
            tplFn: _.template // Default template function is underscore _.template
        };

        this.$me = $(element);

        this._state = 'normal',

        this.conf = _.extend(defaultConf, conf);

        this.init();

        return this;
    };

    var prototypes = {
        init: function() {
            var conf = this.conf;
            this.compileTpl();
            this.$ele = this.refresh(conf);
            this.setup();
            return this.$ele;
        },
        setup: function() {
            var me = this;
            var $me = me.$me;
            var conf = this.conf;
            //this.getTarget().collapse();
        },
        refresh: function(conf) {
            var $me = this.$me;
            var state = this._state;
            var conf = this.conf = _.extend(this.conf, conf);
            var option = {
                btnClass : conf.baseClass + ' ' + conf.metadata[state].btn,
                helpDesc : conf.helpDesc,
                text : conf.metadata[state].text,
                icon : conf.metadata[state].icon
            };
            var $ele = $(this.compiled(option));
            this.$me.html($ele);
            this.$me.tooltip();
            return $ele;
        },
        state : function(state){
            if(typeof state === 'string'){
                this._state = state;
                this.changeState(state);
            }
        },
        changeState : function(state){
            var me = this;
            var $me = me.$me;
            var conf = me.conf;
            if(_.has(conf.metadata, state)){
                var $target = this.getTarget();
                $me.trigger(EVENTS.BEFORE_STATE_CHANGE, state);
                var currStateObj = conf.metadata[state];
                $target.find('.icon').attr(
                    'class', 
                    [
                        'icon', currStateObj.icon
                    ].join(' ')
                );
                $target.find('.text').text(currStateObj.text);
                $target.attr('class', [conf.baseClass, currStateObj.btn].join(' '));
                $me.trigger(EVENTS.AFTER_STATE_CHANGE, state);
            }else{
                error('No state found');
            }
        },
        getTarget : function(){
            if(this.$target){
                return this.$target;
            }else{
                return this.$target = this.$me.find(this.conf.target);
            }
            
        }, 
        compileTpl : function(){
            var conf = this.conf;
            this.compiled = conf.tplFn(conf.tpl, UNDERSCORE_VAR);
        }
    };

    EasyButton.prototype = _.extend(EasyButton.prototype, prototypes);

    var plugin = easyJqPlugin(EasyButton, INSTANCE_PREFIX);
    plugin.EVENTS = EVENTS;
    plugin.version = '0.0.1';
    $.fn[INSTANCE_PREFIX] = plugin; 

})(jQuery, window, document);