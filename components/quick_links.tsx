import React from "react";
import { Button, FormGroup, InputGroup, Intent, AnchorButton } from "@blueprintjs/core";

export interface FigureLinkProps {
    id: string;
    style?: React.HTMLAttributes<HTMLAnchorElement>;
}
export const FigureLink = (props: FigureLinkProps) => (
    <a
        id={`${props.id}-link`}
        style={{ lineHeight: 1, marginLeft: "-20px", paddingRight: "4px", ...props.style }}
        className="figurelink"
        aria-hidden="true"
        href={`#${props.id}`}
    >
        <svg
            className="octicon octicon-link"
            viewBox="0 0 16 16"
            version="1.1"
            width="16"
            height="16"
            aria-hidden="true"
        >
            <path
                fill-rule="evenodd"
                d="M4 9h1v1H4c-1.5 0-3-1.69-3-3.5S2.55 3 4 3h4c1.45 0 3 1.69 3 3.5 0 1.41-.91 2.72-2 3.25V8.59c.58-.45 1-1.27 1-2.09C10 5.22 8.98 4 8 4H4c-.98 0-2 1.22-2 2.5S3 9 4 9zm9-3h-1v1h1c1 0 2 1.22 2 2.5S13.98 12 13 12H9c-.98 0-2-1.22-2-2.5 0-.83.42-1.64 1-2.09V6.25c-1.09.53-2 1.84-2 3.25C6 11.31 7.55 13 9 13h4c1.45 0 3-1.69 3-3.5S14.5 6 13 6z"
            />
        </svg>
    </a>
);
export const mailingList = (
    <div>
        <div>
            <div
                id="mc_embed_signup"
                style={{
                    background: "transparent",
                    clear: "left",
                    font: "14px Helvetica,Arial,sans-serif",
                }}
            >
                <p style={{ minWidth: "100%", width: 0 }}>
                    Give us your email address and we'll keep you informed about the latest developments with the
                    book...
                </p>
                <form
                    className="ui form validate"
                    action="https://xogeny.us3.list-manage.com/subscribe/post?u=3bfc2e5430d32efbe641d6e58&amp;id=f260a85b89"
                    method="post"
                    id="mc-embedded-subscribe-form"
                    name="mc-embedded-subscribe-form"
                    target="_blank"
                    noValidate={true}
                    style={{ marginLeft: "20px" }}
                >
                    <FormGroup label="Email" labelFor="mce-EMAIL" labelInfo="(required)">
                        <InputGroup id="mce-EMAIL" name="EMAIL" placeholder="Your email address" />
                        <div style={{ position: "absolute", left: "-5000px" }}>
                            <input type="text" name="b_3bfc2e5430d32efbe641d6e58_f260a85b89" defaultValue="" />
                        </div>
                    </FormGroup>
                    <div className="clear">
                        <Button id="mc-embedded-subscribe" name="subscribe" type="submit">
                            Subscribe
                        </Button>
                    </div>
                </form>
            </div>
        </div>
    </div>
);

type Question = { question: string | JSX.Element; answer: string | JSX.Element };
const questions: Question[] = [
    {
        question: "Isn't this book free?",
        answer: "Yes, the HTML version is free. But the other electronic versions are not.",
    },
    {
        question: 'What do you mean by "pay what you can"?',
        answer:
            "It means that I want people to learn Modelica in an affordable way. If you are a college student, you can read the HTML version for free or spend $5 and get the electronic versions of the book, too. If you are a professional engineer, you could probably afford to pay around $20 or so for a book tied closely to your professional activities.  Ultimately, it is up to you to decide what the book is worth to you.  I impose a minimum amount of $3 because otherwise fees tend to swallow all the income.",
    },
    {
        question: "What happens if a newer version comes out?",
        answer:
            "Anyone who buys the electronic version of the book is entitled to free upgrades for life. Be sure to include your email address and you'll be added to the mailing list of people who receive new download links for subsequent version. So you don't have to worry about getting stuck with an old version.",
    },
    {
        question: "What kind of DRM is there on the electronic version?",
        answer: (
            <span>
                <em>None</em>. I hate DRM and I don't want to waste my time trying to prevent people from stealing the
                material. If you are that desperate that you need to steal it rather than pay $5 then go ahead. But I
                believe that most technical people are inherently honest and I trust them to pay what they think is
                appropriate. I hope they prove me right.
            </span>
        ),
    },
    {
        question: "Wasn't this book already paid for via Kickstarter?",
        answer:
            "The Kickstarter project was a way to demonstrate demand for the book and avoid taking on a big financial risk. At the end of the day, the goal was a free HTML book on Modelica and that was successful. But I hope to keep the book up to date over time and publish a print version. Those activities go beyond the scope of the original Kickstarter project and by buying the book you not only provide financial compensation for the effort that was already made in creating the book but it encourages such future work as well.",
    },
    {
        question: "Is there a print version of book?",
        answer: (
            <span>
                At the moment, there is no print version of the book. Our goal is to incorporate all the feedback we
                receive on the HTML version of the book before making a print version. We want to avoid situations where
                the print version becomes obsolete compared to the electronic versions. We do plan to produce a print
                version. So, please subscribe to our <a href="http://eepurl.com/PAEKj">mailing list</a> to be informed
                when the print version becomes available.
            </span>
        ),
    },
];

export const faqs = (
    <div>
        {questions.map((question, i) => {
            return (
                <div key={i}>
                    <p>
                        <b>{question.question}</b>
                    </p>
                    <p>{question.answer}</p>
                </div>
            );
        })}
    </div>
);

export const buyBook = (
    <div>
        <div>
            <div>
                <p>
                    The pricing of the book is "pay what you can". However, I've had issues with people paying so little
                    that, given various fees, the net income for me is $0 (<i>i.e.,</i> the only people making money on
                    this are PayPal, Stripe, PayHip, <i>etc</i>).
                </p>
                <p>
                    So, I've configured the payment system to require a minimum payment of $3 (although you can specify
                    any amount above that). If, for some reason, this is too much of a financial burden for you, feel
                    free to contact me.
                </p>

                <p style={{ minWidth: "100%", width: 0 }}>
                    You can purchase both ePub, Mobi and PDF versions of the book in either letter or A4 format. Once
                    you <a href="https://payhip.com/buy?link=3zta">buy the book</a>, you will be redirected to a page
                    that includes a <code>zip</code> file that contains all electronic formats.
                </p>

                <div style={{ display: "flex", justifyContent: "space-around" }}>
                    <AnchorButton href="https://payhip.com/buy?link=3zta" intent={Intent.SUCCESS}>
                        Buy Book
                    </AnchorButton>
                </div>
            </div>
        </div>
    </div>
);
