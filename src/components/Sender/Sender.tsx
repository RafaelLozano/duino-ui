import './sender.css';
import sendIcon from '@/assets/send.svg';

export interface SenderProps extends React.InputHTMLAttributes<HTMLInputElement> {
    
}

export const Sender = ({ ...props }: SenderProps) => {
    
    return <div className="duino-senderContainer" >
        <input className="duino-sender" {...props} />
        <button className="duino-senderButton">
            <img src={sendIcon} alt="send" />
        </button>
    </div>
};
