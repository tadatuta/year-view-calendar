import React, { Component } from 'react';

interface IButton {
    /**
     * Позови меня клик
     */
    onClick: (event: React.MouseEvent<HTMLButtonElement>) => void
}

/**
 * Кнопка. Чтобы тыкать
 */
export class Button extends Component<IButton> {
    render() {
        return <button onClick={this.props.onClick}>{this.props.children}</button>;
    }
}
