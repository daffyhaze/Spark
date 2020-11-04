import React from 'react'

function TextWidget(props) {
 
    return (
        <div>
            <div className='widgetWrap'>
                    <div className='widgetTitle'>
                        {props.Title}
                    </div>
                    <div className='widgetValue'>
                        <div class='value'>{props.value}</div>
                        <div class='description'>{props.description}</div>
                    </div>
                </div>
        </div>
    )
}

export default TextWidget;
