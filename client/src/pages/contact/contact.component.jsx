import React from 'react';
import { SERVER_URL } from '../../utils/constants';
import CustomInput from '../../components/custom-input/custom-input.component';
import CustomButton from '../../components/custom-button/custom-button.component';
import './contact.styles.scss';

class ContactPage extends React.Component {
    state = {
        name: '',
        email: '',
        phone: '',
        message: ''
    };

    onInputChange = event => {
        const { value, name } = event.target;
        this.setState({ ...this.state, [name]: value });
    };

    onFormSubmit = event => {
        event.preventDefault();

        fetch(`${SERVER_URL}/message`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                name: this.state.name,
                email: this.state.email,
                phone: this.state.phone,
                message: this.state.message
            })
        })
            .then(response => {
                if (!response.ok) throw new Error();
                else return response.json();
            })
            .then(data => {
                this.props.onSnackbarDisplay({
                    display: true,
                    alert: 'success',
                    message: 'Message envoyé avec succès !',
                    icon: 'paper plane outline'
                });

                this.setState({ name: '', email: '', phone: '', message: '' });
            })
            .catch(error => {
                this.props.onSnackbarDisplay({
                    display: true,
                    alert: 'error',
                    message: "Erreur lors de l'envoi."
                });
            });
    };

    render() {
        const { name, email, phone, message } = this.state;

        return (
            <div className="contact">
                <h2>Me Contacter</h2>
                <form onSubmit={this.onFormSubmit}>
                    <div className="form-column">
                        <CustomInput
                            id="name"
                            type="text"
                            name="name"
                            value={name}
                            label="Nom"
                            handleChange={this.onInputChange}
                            required
                        />
                        <CustomInput
                            id="email"
                            type="email"
                            name="email"
                            value={email}
                            label="Email"
                            handleChange={this.onInputChange}
                            required
                        />
                        <CustomInput
                            id="phone"
                            type="tel"
                            name="phone"
                            value={phone}
                            label="Téléphone"
                            handleChange={this.onInputChange}
                        />
                    </div>

                    <div className="form-column">
                        <CustomInput
                            id="message"
                            name="message"
                            value={message}
                            label="Votre message"
                            handleChange={this.onInputChange}
                            textarea={true}
                            required
                        />
                        <CustomButton type="submit">Envoyer</CustomButton>
                    </div>
                </form>
            </div>
        );
    }
}

export default ContactPage;
