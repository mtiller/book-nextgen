import React from "react";
import { Button, FormGroup, InputGroup } from "@blueprintjs/core";

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
                    action="http://xogeny.us3.list-manage.com/subscribe/post?u=3bfc2e5430d32efbe641d6e58&amp;id=f260a85b89"
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
            "It means that I want people to learn Modelica in an affordable way. If you are a college student, you can read the HTML version for free or spend $5 and get the electronic versions of the book, too. If you are a professional engineer, you could probably afford to pay at $20 or so for a book tied closely to your professional activities.  Ultimately, it is up to you to decide what the book is worth to you.",
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
            <div className="pull-right">
                <form action="https://www.paypal.com/cgi-bin/webscr" method="post" target="_top">
                    <input type="hidden" name="cmd" defaultValue="_s-xclick" />
                    <input type="hidden" name="hosted_button_id" defaultValue="43ECRF7WVKHFN" />
                    <input type="hidden" name="return" defaultValue="/_static/thanks.html" />
                    <input
                        type="image"
                        name="submit"
                        alt="PayPal - The safer, easier way to pay online!"
                        src="https://www.paypalobjects.com/en_US/i/btn/btn_buynowCC_LG.gif"
                    />
                    <img width={1} height={1} src="https://www.paypalobjects.com/en_US/i/scr/pixel.gif" />
                </form>
            </div>
            <p style={{ minWidth: "100%", width: 0 }}>
                You can purchase both ePub and PDF versions of the book in either letter or A4 format. Once you buy the
                book, you will be sent links to download the electronic versions. As new versions of the book become
                available, you will be sent updated links to the latest electronic versions.
            </p>
        </div>
    </div>
);
