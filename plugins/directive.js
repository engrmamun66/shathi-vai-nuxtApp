export default defineNuxtPlugin(nuxtApp => {
    nuxtApp.vueApp.directive('focus', (el, bindings) => {
        if (el?.tagName != 'INPUT') el = el.querySelector('input')
        if (el?.tagName != 'INPUT') return
        if (!el.getAttribute('event-focus')) {
            el.setAttribute('event-focus', true)
            el.focus()
        }
    });
    nuxtApp.vueApp.directive('click-if-index-is-zero', (el, bindings) => {
        let {value} = bindings
        setTimeout(()=>{
            let index = el.getAttribute('index')
            if (index == 0 && State('common').clickedFirstRow == false){
                State('common').clickedFirstRow = true
                el.click()
            }
        }, 1000)
    });
    nuxtApp.vueApp.directive('keep-only-digits', (el, bindings) => {
        let element 
        if (el?.type == 'text' || el?.type == 'number' || el?.type == 'password'){
            element = el
        }else{
            element = el.querySelector('input')
        }
        let update_value = () => element.value = element?.value?.replace(/\D/g, '')
        element.removeEventListener('keyup', update_value)
        element.removeEventListener('keydown', update_value)
        element.removeEventListener('change', update_value)

        element.addEventListener('keyup', update_value)
        element.addEventListener('keydown', update_value)
        element.addEventListener('change', update_value)
    });
    nuxtApp.vueApp.directive('keyup-enter', (el, bindings) => {
        let { value: callback } = bindings
        let element = el.querySelector('input')
        if (!element.getAttribute('callback-assigned')){
            element.addEventListener('keyup', (e) => {if(e.key == 'Enter') callback()})
            element.setAttribute('callback-assigned', true)
        }
    });
    nuxtApp.vueApp.directive('validation', {mounted:(el, bindings) => {
        /**
         * Use Format: <input type="text" v-validate:validator_string|||.keyup.focus="[errors, field_name]">
         * ==========================================================================================================
         * validator_string/arg:
         * --------------------
         * validator_string = 'required|required:if-#id,#id|required-if-val-in:role_id-4,4,car|type:object|min:3|max:4|range:2-3|minLength:3|maxLength:4|length:2-5|length:4|regexKey:regexKey|regex|regexArr|matchWith:password' 
         * required ---------------------------------------|
         * required:if-#status-----------------------------| required apply, when #status value is available
         * required:if-#status,#user_email ----------------| Note: Just run useNuxtApp().$eventBus('v-validation', 'bypass_errormessage'), when changed depended fields
         * 
         * required-if-val-in:role_id-4,4,car -----|
         * required-if-val-in:role_id-null,4,4,car -----| null will convert to ''
         * required-if-val-not-in:role_id-4,4,car -|
         * required-if-val-not-in:role_id-null,4,4,car -| null will convert to ''
         * 
         * type:string|number|boolean|array|object|email
         * min:3
         * max:3
         * range:3-8
         * minLength:3
         * maxLength:3
         * length:3-8
         * regexKey:phone [[ example: regexKey:address=[errors, field_name, 'Custome message here(Otional)  ]]
         * regex [[ example: regex=[errors, field_name, /\d{3-4}/g, 'Custome message here(Otional)']  ]] 
         * regexArr [[ example: regex=[errors, field_name, [/\d{3-4}/g, /\d{3-4}/g], 'Custome message here(Otional)']  ]] 
         * matchWith:passwor_confirm [[  to match current filed(e.g. passwor_confirm) with password field ]]
         * |||: it's only for looking good after validator_string to pass some optional modifires
         * 
         * modifiers
         * ---------
         * focus: To focus initailly any field
         * keyup: keyup event apply to view changing wity typing
         * 
         * ==========================================================================================================
         * Important:: Before submit trigger this function ► H.hasError(errors) to cehck erros
         * About Error Style: adding (.v-validation-error) class [[ you can modified from global style.css file ]]
         */
        const PATTERNS = {
            phone: { p: [/^\(?\+?[0-9]*?\)?\s?\d{8,14}$/,], m: 'Number is not valid(digit 8-14)' },
            address: { p: [/[a-z0-9A-Z]{3,}/], m: 'Address is not valid' },
            lat: { p: [/^(-)?[0-9]{2,3}(\.)?[0-9]+$/], m: 'Latitude is not valid' },
            lng: { p: [/^(-)?[0-9]{2,3}(\.)?[0-9]+$/], m: 'Longitude is not valid' },
        }
        try {
            let { arg: validator_string, modifiers, value } = bindings
            if (!['INPUT', 'SELECT'].includes(el?.tagName)){
                el = el.querySelector('input') || el.querySelector('select')
            }

            let errors = value[0]
            let field_name = value[1]
            let validator_obj = { [field_name]: {} }
            
            if (!el || !validator_string || !(value instanceof Array) || value?.length < 2) return

            let label_element =() => {
                try {
                    let inFound, label, loop = null
                    loop = 0
                    while (loop < 5 && label == null) {
                        /**
                         * for type password
                         * Directly no previous siblings is no siblings
                        */
                        inFound = loop == 0 ? (el?.previousElementSibling || el?.parentElement) : inFound?.previousElementSibling
                        if (inFound && inFound?.tagName == 'LABEL') label = inFound
                        loop++
                    }
                    return label
                } catch (error) {
                    
                }
            }
            if (!label_element()) return Common().toaster('error', 'lable tag not found for ' + field_name )

            function remove_red_star () {
                let nextSibling = label_element().nextElementSibling
                if (nextSibling && nextSibling.getAttribute('red-start-boundary')) {
                    if (nextSibling.getAttribute('red-start-boundary')) {
                        nextSibling.remove()
                    }
                }
            }
            function add_red_star(force_add=false){
                let nextSibling = label_element().nextElementSibling
                if (!force_add && validator_string.split('|').some(arg => arg.startsWith('required'))) {
                    if (nextSibling && nextSibling.getAttribute('red-start-boundary')) {
                        if (nextSibling.getAttribute('red-start-boundary')) {
                            nextSibling.innerHTML = H.getRedStar();
                        }
                    } else {
                        const newElement = document.createElement('span');
                        newElement.setAttribute('red-start-boundary', true)
                        newElement.setAttribute('red-start-boundary-' + field_name, true)
                        newElement.innerHTML = H.getRedStar();
                        label_element().insertAdjacentElement('afterend', newElement);
                    }
                }
            }            

            function check(event){
                // log('fired')
                const fn = {
                    remove_redStar_errorMessage_and_events: () => {
                        setTimeout(() => {
                            remove_red_star()
                            if (errors[field_name]) delete errors[field_name]
                            var errBoundary = document.querySelector(`[error-boundary-${field_name}=true]`)
                            if (errBoundary) errBoundary.remove()
                        }, 100)
                    },
                    create_validator_from_validator_string: (validator_string)=>{
                        validator_string.split('|').forEach(_validator_ => {
                            if(_validator_){
                                let parts = _validator_.split(":")
                                let key = parts[0]

                                if (key == 'matchWith') {
                                    var matchWith = document.querySelector(`[name="${parts[1]}"]`)
                                    if (matchWith?.value || el?.value) {
                                        if (matchWith?.value != el?.value) {
                                            validator_obj[field_name]['regex'] = `/^${matchWith?.value}$/`
                                            validator_obj[field_name]['message'] = H.filterText(field_name) + " doesn't match with " + H.filterText(parts[1])
                                        }else{
                                            if (validator_obj[field_name]['regex']) delete validator_obj[field_name].regex
                                            if (validator_obj[field_name]['message']) delete validator_obj[field_name].message
                                        }
                                    }                                    
                                }                                
                                else if (key == 'required') {
                                    if(parts[1]?.startsWith('if')){
                                        //example: required:if-status
                                        var fields = parts[1].slice(3, 44)?.split(',')
                                        var allFields = fields?.map(_field_id_ => (document.querySelector(`${_field_id_}`) || null))
                                        if (allFields?.every(element =>  (element?.value && element?.value != '0' && element?.value != 'false'))){
                                            remove_red_star()
                                            add_red_star(/*if required*/) 
                                            validator_obj[field_name]['required'] = true
                                        }else{                                            
                                            fn.remove_redStar_errorMessage_and_events()
                                        }
                                    }else{
                                        validator_obj[field_name]['required'] = true
                                    }
                                }
                                else if (key == 'required-if-val-in') {
                                    try {
                                        //example: required-if-val-in:role_id-4,4,car
                                        var [ fieldName, _values ] = parts[1].split('-')
                                        _values = _values.split(',')
                                        _values = _values?.map(v => v == 'null' ? '' : v)
                                        var findFeild = document.querySelector(`[name=${fieldName}]`)
                                        if (_values.includes(findFeild?.value)) {
                                            setTimeout(() => { add_red_star(true)}, 100)
                                            validator_obj[field_name]['required'] = true
                                        } else {
                                            fn.remove_redStar_errorMessage_and_events()
                                        }                                        
                                    } catch (error) {
                                        // console.warn(error)
                                    }
                                    
                                }
                                else if (key == 'required-if-val-not-in') {
                                    try {
                                        //example: required-if-val-not-in:role_id-4,4,car
                                        var [ fieldName, _values ] = parts[1].split('-')
                                        _values = _values.split(',')
                                        _values = _values?.map(v => v == 'null' ? '' : v)
                                        var findFeild = document.querySelector(`[name=${fieldName}]`)
                                        if (!_values.includes(findFeild?.value)) {
                                            setTimeout(() => { add_red_star(true) }, 100)
                                            validator_obj[field_name]['required'] = true
                                        } else {
                                            fn.remove_redStar_errorMessage_and_events()
                                        }                                        
                                    } catch (error) {
                                        // console.warn(error)
                                    }
                                    
                                }
                                else if (key == 'regexKey' || key == 'regex' || key == 'regexArr') {
                                    if (key == 'regexKey'){
                                        if (PATTERNS[parts[1]]){
                                            var make_key = (PATTERNS[parts[1]].p instanceof Array) ? 'regexArr' : 'regex'
                                            validator_obj[field_name][make_key] = PATTERNS[parts[1]].p
                                            if (value[2] || PATTERNS[parts[1]].m) validator_obj[field_name][make_key]['message'] = value[2] || PATTERNS[parts[1]].m
                                        }
                                    }
                                    if (value[2]){
                                        if (key == 'regex'){
                                            validator_obj[field_name]['regex'] = value[2]
                                            if (value[3]) validator_obj[field_name]['message'] = value[3]
                                        }
                                        else if (key == 'regexArr'){
                                            validator_obj[field_name]['regexArr'] = value[2]
                                            if (value[3]) validator_obj[field_name]['message'] = value[3]
                                        }
                                    }
                                }
                                else if (key == 'type') {
                                    validator_obj[field_name]['type'] = String(parts[1])
                                }
                                else if (key == 'range') {
                                    var subparts = parts[1].split('-') // length:2-5
                                    if (subparts?.length == 2){
                                        validator_obj[field_name]['min'] = Number(subparts[0])
                                        validator_obj[field_name]['max'] = Number(subparts[1])
                                    }
                                }
                                else if (key == 'length' || key == 'len') {
                                    var subparts = parts[1].split('-') // length:2-5
                                    if (subparts?.length == 2){
                                        validator_obj[field_name]['minLength'] = Number(subparts[0])
                                        validator_obj[field_name]['maxLength'] = Number(subparts[1])
                                    }else{
                                        validator_obj[field_name]['length'] = Number(parts[1])
                                    }
                                }
                                else {
                                    if (parseInt(parts[1])) validator_obj[field_name][key] = parseInt(parts[1])
                                }
                            }
                        })
                    },
                    set_styles: ()=>{
                        let multSelectorButton = el?.previousElementSibling
                        if (multSelectorButton && multSelectorButton?.tagName == 'BUTTON'){
                            multSelectorButton.style.borderLeft = '2px solid red'
                            multSelectorButton?.classList.add('v-validation-error')
                        }else{
                            el.style.borderLeft = '2px solid red'
                            el?.classList.add('v-validation-error')
                        }
                    },
                    unset_styles: ()=>{
                        let multSelectorButton = el?.previousElementSibling
                        if (multSelectorButton && multSelectorButton?.tagName == 'BUTTON') {
                            multSelectorButton.style.borderLeft = '2px solid transparent'
                            multSelectorButton?.classList.remove('v-validation-error')
                        } else {
                            el?.classList.remove('v-validation-error')
                            el.style.borderLeft = '2px solid transparent'
                        }
                    },
                    add_error_message: (message='')=>{
                        let next_el = el.nextElementSibling
                        if (next_el && next_el?.getAttribute('error-boundary')){
                            if (event==false){
                                next_el.style.display = 'none'
                            }else{
                                next_el.style.display = 'block' 
                            }
                            next_el.innerHTML = `<span class="field-error-span text-danger style="padding:0px" p-1" error-message-${field_name}>${message}</span>`;
                        }else{
                            const newElement = document.createElement('div');
                            if (!next_el?.getAttribute('shown-by-event') && !(event!=false)) newElement.style.display = 'none'
                            newElement.setAttribute('error-boundary', true)
                            newElement.setAttribute('error-boundary-' + field_name, true)
                            newElement.innerHTML = `<span class="field-error-span text-danger style="padding:0px" p-1" error-message-${field_name}>${message}</span>`;
                            el.insertAdjacentElement('afterend', newElement);
                        }
                    },
                    remove_error_message: ()=>{
                        let next_el = el.nextElementSibling
                        if (next_el){
                            if (next_el.getAttribute('error-boundary')){
                                next_el.remove()
                            }
                        }
                    },
                }
                /* -------------------------------------------------------------------------- */
                /* -------------------------------------------------------------------------- */
                /* -------------------------------------------------------------------------- */
                /*                               Output Section                               */
                /* -------------------------------------------------------------------------- */
                fn.unset_styles()
                fn.create_validator_from_validator_string(validator_string)
                let res = H.objectValidation({ [field_name]: el?.value}, validator_obj)
                if (res.status == 'NOK') {
                    errors[field_name] = res.errors[field_name]
                    let message = errors[field_name]?.join(' and ')

                    if (typeof event=='object'){
                        fn.add_error_message(message)
                        fn.set_styles()
                    }else if(event!='bypass_errormessage'){
                        fn.add_error_message(message)
                        if (event != false){
                            fn.set_styles()
                        }
                    }   
                }else{
                    fn.remove_error_message()
                    fn.unset_styles()
                    if (errors[field_name]) delete errors[field_name]
                }
            }

            remove_red_star()
            add_red_star(/*if required*/) 

            el.setAttribute('v-validated', true) 
            el.setAttribute('name', field_name) 

            // Intial Run
            if (!el.getAttribute('initially_run_without_event')) {
                el.setAttribute('initially_run_without_event', true)
                check(false)
                // register eventBus
                function showAllError(data){
                    remove_red_star()
                    add_red_star(/*if required*/) 
                    check(data)
                    if (data != 'bypass_errormessage'){
                        let error_divs = document.querySelectorAll('[error-boundary="true"]')
                        error_divs?.forEach(div => div.style.display = 'block')
                    }
                }
                useNuxtApp().$off(showAllError)
                useNuxtApp().$on('v-validation', showAllError)
            }

            el.removeEventListener('change', check)
            el.addEventListener('change', check)
            
            el.removeEventListener('focusout', check)
            el.addEventListener('focusout', check)
            
            if (modifiers?.keyup){
                el.removeEventListener('keyup', check)
                el.addEventListener('keyup', check)
            }

            if (modifiers?.focus && !el.getAttribute('event-focus')){
                el.setAttribute('event-focus', true)
                el.focus()
            }            

        } catch (error) {
            console.log('v-validation-error', error)
        }
    }//End mounted
    });

})