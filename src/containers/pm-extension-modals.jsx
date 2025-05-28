import PropTypes from 'prop-types';
import React from 'react';
import bindAll from 'lodash.bindall';

import ExtensionModal from '../components/pm-extension-modals/extension-modals.jsx';
import ExtensionModalStyles from '../components/pm-extension-modals/extension-modals.css';

const MODAL_MANAGER_METHODS = [
    'updateModals',
    'modalsAvailable',
    '_guiGetClassNames',
];

class ExtensionModals extends React.Component {
    constructor (props) {
        super(props);
        bindAll(this, [
            'updateModals',
            'modalsAvailable',
            '_guiGetClassNames',
        ]);
        this.state = {
            updateId: 0
        };
    }

    componentDidMount () {
        const modalManager = this.props.vm.runtime.modalManager;
        for (const method of MODAL_MANAGER_METHODS) {
            modalManager[method] = this[method];
        }
    }
    shouldComponentUpdate (_, nextState) {
        return (
            this.state.updateId !== nextState.updateId
        );
    }

    // overrides VM methods
    updateModals () {
        this.setState({
            updateId: this.state.updateId + 1,
        });
    }
    modalsAvailable () {
        return true;
    }
    _guiGetClassNames () {
        return ExtensionModalStyles;
    }
    
    render () {
        const vm = this.props.vm;
        if (!vm) return;
        if (!vm.runtime) return;
        if (!vm.runtime.modalManager) return;
        const modals = vm.runtime.modalManager._modals;
        return (<>
            {Object.keys(modals).map((modalId) => {
                const modal = modals[modalId];
                return (
                    <ExtensionModal
                        {...modal._config}
                        onMount={modal.onModalMount.bind(modal)}
                        onButtonsMount={modal.onModalButtonsMount.bind(modal)}
                        onUnmount={modal.onModalUnmount.bind(modal)}
                        onCancel={modal.onModalCancel.bind(modal)}
                        vm={this.props.vm}
                    />
                );
            })}
        </>);
    }
}

ExtensionModals.propTypes = {
    vm: PropTypes.any
};

export default ExtensionModals;
