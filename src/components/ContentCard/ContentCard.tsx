import { Content } from '../../models/Content';
import { TextUtils } from '../../services/utils/TextUtils';

export interface ContentCardProps {
    content: Content;
};

export function ContentCard(props: ContentCardProps) {

    const { content } = props;

    return (
        <div className="ContentCard card shadow my-3 p-3">
            <a className="text-align-left" href={content.url} target="_blank" rel="noopener noreferrer">
                {content.title} <br />
                {content.header_image_url &&
                    <img src={content.header_image_url} width="150"
                        alt={content.title} />}
            </a>
            <p>{TextUtils.truncate(content.description, 140)} </p>
        </div>
    );
}
