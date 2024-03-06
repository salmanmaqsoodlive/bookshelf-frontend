import React from 'react'
import classNames from 'classnames'

const CustomButton = ({ children, className, ...rest }) => {
    return (
        <button className={classNames(
            'py-2',
            'px-6',
            'rounded-lg',
            'shadow-md',
            'font-bold',
            className
        )}
            {...rest}
        >{children}</button>
    )
}

export default CustomButton