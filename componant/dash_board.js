class Dash_Board extends HTMLElement {
    constructor() {
        super();
        this.firest_connect_state=false;
    }

    firest_connect(){
        if(!this.firest_connect_state){
            this.render()
            this.set_active_to_nav_button_for_fires_time()
            this.set_active_to_nav_button()
            this.handel_avatar_click()
            this.handel_avatar_button_click()
            this.handel_logo_click()
            this.go_to_viow_if_exest_in_location()
            this.firest_connect_state=true
        }
    }

    render(){
        this.innerHTML=`
            <top-div class='center'>
                <left-div class='center'>
                    <c-icon src='/dashboard/icons/logo2.png'  size='80'></c-icon>
                </left-div>               
                <right-div class='center'>
                    <c-icon src='https://ssl.gstatic.com/images/branding/product/1x/drive_2020q4_48dp.png'  size='80' layer_target='home' class='active'></c-icon>
                    <in-out-slider>
                        <div class='center' button_key='Account'>
                            <c-icon src='/dashboard/icons/account.svg'  size='40'></c-icon>
                            <span>Account</span>                        
                        </div>
                        <div class='center' button_key='Downloads'>
                            <c-icon src='/dashboard/icons/downloads.svg'  size='40'></c-icon>
                            <span>Downloads</span>                            
                        </div>
                        <div class='center' button_key='Orders'>
                            <c-icon src='/dashboard/icons/history.svg'  size='40'></c-icon>
                            <span>Orders</span>                           
                        </div>
                        <div class='center' button_key='Help'>
                            <c-icon src='/dashboard/icons/help.svg'  size='40'></c-icon>
                            <span>Help</span>                           
                        </div>
                        <div class='center'>
                            <c-icon src='/dashboard/icons/log_out.svg'  size='40'></c-icon>
                            <span>Sign Out</span>                           
                        </div>                       
                    </in-out-slider>
                </right-div>
            </top-div>
            <layers-holder-head class='center' target_id='main_layer_holder'>
                <div layer_target='Account' class='center'>
                    <c-icon src='/dashboard/icons/account.svg'  size='50'></c-icon>
                    <span>Account</span>  
                </div>

                <div layer_target='Downloads' class='center'>
                    <c-icon src='/dashboard/icons/downloads.svg'  size='50'></c-icon>
                    <span>Downloads</span>
                </div>

                <div layer_target='Orders' class='center'>
                    <c-icon src='/dashboard/icons/history.svg'  size='50'></c-icon>
                    <span>Orders</span>
                </div>

                <div layer_target='Help' class='center'>
                    <c-icon src='/dashboard/icons/help.svg'  size='50'></c-icon>
                    <span>Help</span>
                </div>
            </layers-holder-head>          
            <bottom-div class='center'>
                <layers-holder id='main_layer_holder' in_show='Account' class='center'>
                    <hestory-part class='' layer_id='Orders' display='flex'></hestory-part>
                    <download-list class='' layer_id='Downloads' display='flex'></download-list>
                    <account-part layer_id='Account' display='flex'></account-part>
                </layers-holder>               
            </bottom-div>
        `       
    }

    go_to_viow_if_exest_in_location(){
        var viow_key= window.location.hash;
        if(viow_key){
            document.querySelector(`[layer_target='${viow_key.slice(6)}']`).click()
        }
        history.replaceState(null, null, ' ');
    }

    handel_avatar_click(){
        this.children[0].children[1].children[0]
        .addEventListener('click',()=>{
            var slide_state= this.children[0].children[1].children[1].slide_state;
            switch(slide_state){
                case "in":
                    this.children[0].children[1].children[1].slide_out('234','c')
                    break;
                case "out":
                    this.children[0].children[1].children[1].slide_in('b_to_t')
                    break;                  
            }
        })
    }

    handel_logo_click(){
        this.children[0].children[0].children[0]
        .addEventListener('click',()=>{
            window.location.href = '/';
        })
    }

    handel_avatar_button_click(){
        for(var childern of this.children[0].children[1].children[1].children){
            childern.addEventListener('click',(e)=>{
                var button_key=e.currentTarget.getAttribute('button_key');
                if(button_key){
                    document.querySelector(`[layer_target='${button_key}']`).click()
                }
            })
        }
    }

    set_active_to_nav_button(){ 
        for(var child of this.children[1].children){
            child.addEventListener('click',(e)=>{
                this.active_nav_button.classList.remove('active')
                this.active_nav_button=e.currentTarget
                this.active_nav_button.classList.add('active')
            })
        }
    }

    set_active_to_nav_button_for_fires_time(){
        this.active_nav_button=this.children[1].children[0];
        this.active_nav_button.classList.add('active')
    }

    run_on_Attribute_change(name){
        if(this.firest_connect_state){
            return      
        }
    }

    connectedCallback(){ 
        this.firest_connect()           
    }

    attributeChangedCallback(name, oldValue, newValue){
        this[name]=newValue;
        this.run_on_Attribute_change(name)

    } 
    static get observedAttributes() { return []; } 
           
}
customElements.define('dash-board', Dash_Board);