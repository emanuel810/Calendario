import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import { calendarApi } from '../api';
import { convertEvents } from '../helpers';
import { onAddNewEvent, onDeleteEvent, onLoadEvents, onSetActiveEvent, onUpdateEvent } from '../store';


export const useCalendarStore = () => {
  
    const dispatch = useDispatch();
    const { events, activeEvent } = useSelector( state => state.calendar );
    const { user } = useSelector( state => state.auth );

    const setActiveEvent = ( calendarEvent ) => {
        dispatch( onSetActiveEvent( calendarEvent ) )
    }

    const startSavingEvent = async( calendarEvent ) => {
        
        try {
            if( calendarEvent.id ) {
                // Actualizando
                await calendarApi.put(`/events/${ calendarEvent.id }`, calendarEvent );
                dispatch( onUpdateEvent({ ...calendarEvent, user }) );
                return;
            } 
    
            // Creando
            const { data } = await calendarApi.post('/events', calendarEvent );
            console.log(data)
            dispatch( onAddNewEvent({ ...calendarEvent, id: data.eventoGuardado.id, user }) );

        } catch (error) {
            Swal.fire('Error al guardar', error.response.data.msg, 'error');
            console.log(error);
        }
    }

    const startDeletingEvent = async() => {
       
        try {
            console.log('startdeletingevent')
            await calendarApi.delete(`/events/${ activeEvent.id }` );
            dispatch( onDeleteEvent() );
        } catch (error) {
            console.log(error);
            Swal.fire('Error al eliminar', error.response.data.msg, 'error');
        }

    }


    const startLoadingEvents = async() => {
        try {
            
            const { data } = await calendarApi.get('/events');
            const events = convertEvents( data.eventos );
            dispatch( onLoadEvents( events ) );


        } catch (error) {
          console.log('Error cargando eventos');
          console.log(error)
        }
    }
    
    return {
        activeEvent,
        events,
        hasEventSelected: !!activeEvent, // si existe regresa true, sino regresa falso

        startDeletingEvent,
        setActiveEvent,
        startSavingEvent,
        startLoadingEvents,
    }
}
