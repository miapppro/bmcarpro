import { Injectable } from '@angular/core';

@Injectable()
export class MessagesService {

    private messages = [
        {
            name: 'ashley',
            text: 'dasdasdas',
            time: '1 min ago'
        },
        {
            name: 'michael',
            text: 'dasdasdas',
            time: '2 hrs ago'
        },
        {
            name: 'julia',
            text: 'dasdasd',
            time: '10 hrs ago'
        },
        {
            name: 'bruno',
            text: 'dasdasdas',
            time: '1 day ago'
        },
        {
            name: 'tereza',
            text: 'dasdasdas',
            time: '1 day ago'
        },
        {
            name: 'adam',
            text: 'sdasdasd',
            time: '2 days ago'
        },
        {
            name: 'michael',
            text: 'dsadasdasdsa',
            time: '1 week ago'
        }
    ];

    private files = [
        {
            text: 'gradus.zip',
            size: '~6.2 MB',
            value: '47',
            color: 'primary'
        },
        {
            text: 'documentation.pdf',
            size: '~14.6 MB',
            value: '33',
            color: 'accent'
        },
        {
            text: 'wallpaper.jpg',
            size: '~558 KB',
            value: '60',
            color: 'warn'
        },
        {
            text: 'letter.doc',
            size: '~57 KB',
            value: '80',
            color: 'primary'
        },
        {
            text: 'azimuth.zip',
            size: '~10.2 MB',
            value: '55',
            color: 'warn'
        },
        {
            text: 'contacts.xlsx',
            size: '~96 KB',
            value: '75',
            color: 'accent'
        }
    ];

    private meetings = [
        {
            day: '09',
            month: 'Mayo',
            title: 'Reunion',
            text: 'Sistema',
            color: 'danger'
        },
        {
            day: '15',
            month: 'Mayo',
            title: 'Transporte',
            text: 'Reunion de Transporte',
            color: 'primary'
        },
        {
            day: '12',
            month: 'Junio',
            title: 'Reunion con Jhonny',
            text: 'Ver camion nuevo',
            color: 'info'
        },
        {
            day: '14',
            month: 'Junio',
            title: 'Reunion con Limber',
            text: 'ir al cine!',
            color: 'warning'
        },
        {
            day: '29',
            month: 'Septiembre',
            title: 'Reunion con Mentisan',
            text: 'Mecanico, capo!',
            color: 'success'
        }
    ];

    public getMessages(): Array<object> {
        return this.messages;
    }

    public getFiles(): Array<object> {
        return this.files;
    }

    public getMeetings(): Array<object> {
        return this.meetings;
    }

}
