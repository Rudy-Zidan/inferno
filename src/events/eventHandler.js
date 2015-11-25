import SyntheticEvent from './SyntheticEvent';
import getEventID from './getEventID';
import EventRegistry from './EventRegistry';
import listenersStorage from './listenersStorage';

function eventHandler(e, type) {

    // TODO! If some 'e' need a fix, do it here
    // TEMPORARY FIX!!
    if (e.type === 'mousemove') {
        type = 'onMouseMove';
    } else if (!type) {

        type = 'on' + e.type[0].toUpperCase() + e.type.substring(1);
    }
    const listenersToInvoke = [];

    let target = e.target,
        listenersCount = EventRegistry[type].counter,
        listeners,
        listener;

alert(EventRegistry[type]);

    for (; target != null && 0 < listenersCount && target !== document.parentNode;) {

        let domNodeId = getEventID(target, true);

        if (domNodeId) {

            listeners = listenersStorage[domNodeId];

            if (listeners && (listener = listeners[type])) {

                listenersToInvoke.push(listener);
                --listenersCount;
            }
        }

        target = target.parentNode;
    }

    if (listenersToInvoke.length) {

        const event = SyntheticEvent(e);

        for (let i = 0; i < listenersToInvoke.length; i++) {
            listenersToInvoke[i]('Bilat nimo');
            if (event.isPropagationStopped()) {
                break;
            }
        }
    }
}

export default eventHandler;