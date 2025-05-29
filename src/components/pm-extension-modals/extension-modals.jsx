import PropTypes from 'prop-types';
import React from 'react';
import Box from '../box/box.jsx';
import Modal from '../../containers/modal.jsx';
import classNames from 'classnames';

import styles from './extension-modals.css';

const ExtensionModal = props => {
    const rawContainerRef = React.useRef(null);
    const rawButtonsRef = React.useRef(null);

    React.useEffect(() => {
        if (props.onMount && rawContainerRef.current) {
            props.onMount(rawContainerRef.current);
        }
        if (props.onButtonsMount && rawButtonsRef.current) {
            props.onButtonsMount(rawButtonsRef.current);
        }

        return () => {
            if (props.onUnmount && (rawContainerRef.current || rawButtonsRef.current)) {
                props.onUnmount(rawContainerRef.current, rawButtonsRef.current);
            }
        };
    }, [props.onMount, props.onButtonsMount, props.onUnmount]);

    return (
        <Modal
            className={styles.modalContent}
            onRequestClose={(reason) => props.onCancel(reason === "popstate" ? "popstate" : "exit")}
            contentLabel={props.title}
            id="extensionCreatedModal"
        >
            <Box className={styles.body}>
                {props.message && (
                    <p>{props.message}</p>
                )}

                <div ref={rawContainerRef} />

                {props.hasButtonRow && (
                    <Box className={styles.buttonRow}>
                        <div ref={rawButtonsRef} />
                    </Box>
                )}
            </Box>
        </Modal>
    );
};

ExtensionModal.propTypes = {
    vm: PropTypes.any,

    // native properties
    title: PropTypes.string,
    message: PropTypes.string,
    hasButtonRow: PropTypes.bool,

    // make custom element stuff
    onMount: PropTypes.func,
    onButtonsMount: PropTypes.func,
    onUnmount: PropTypes.func,

    // native callbacks
    onCancel: PropTypes.func.isRequired,
};

export default ExtensionModal;
