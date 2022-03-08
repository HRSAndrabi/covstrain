import Layout from "../../components/Layout/Layout";
import Container from "../../components/Layout/Container";

export default function PrivacyPolicy() {
    return (
        <Container>
            <article className="max-w-screen-prose mx-auto prose prose-slate prose-sm sm:prose-base mb-10">
                <h3>Covstrain Privacy Policy</h3>
                <p>
                    This Privacy Policy describes how your personal information
                    is collected, used, and shared when you visit or make a
                    purchase from covstrain.com (the “Site”).
                </p>
                <h4>Personal information we collect</h4>
                <p>
                    When you visit the Site, we automatically collect certain
                    information about your device, including information about
                    your web browser, IP address, time zone, and some of the
                    cookies that are installed on your device. Additionally, as
                    you browse the Site, we collect information about the
                    individual web pages or products that you view, what
                    websites or search terms referred you to the Site, and
                    information about how you interact with the Site. We refer
                    to this automatically-collected information as “Device
                    Information.”
                </p>
                <p>
                    We collect Device Information using the following
                    technologies:
                </p>
                <ul>
                    <li>
                        “Cookies” are data files that are placed on your device
                        or computer and often include an anonymous unique
                        identifier. For more information about cookies, and how
                        to disable cookies, visit
                        http://www.allaboutcookies.org.
                    </li>
                    <li>
                        “Log files” track actions occurring on the Site, and
                        collect data including your IP address, browser type,
                        Internet service provider, referring/exit pages, and
                        date/time stamps.
                    </li>
                    <li>
                        “Web beacons,” “tags,” and “pixels” are electronic files
                        used to record information about how you browse the
                        Site.
                    </li>
                </ul>
                <p>
                    When we talk about “Personal Information” in this Privacy
                    Policy, we are talking both about Device Information and
                    Order Information.
                </p>
                <h4>How do we use your information?</h4>
                <p>
                    We use the Device Information that we collect to help us
                    screen for potential risk and fraud (in particular, your IP
                    address), and more generally to improve and optimize our
                    Site (for example, by generating analytics about how our
                    customers browse and interact with the Site).
                </p>
                <h4>Your rights</h4>
                <p>
                    If you are a European resident, you have the right to access
                    personal information we hold about you and to ask that your
                    personal information be corrected, updated, or deleted. If
                    you would like to exercise this right, please contact us
                    through the contact information below.
                </p>
                <h4>Changes</h4>
                <p>
                    We may update this privacy policy from time to time in order
                    to reflect, for example, changes to our practices or for
                    other operational, legal or regulatory reasons.
                </p>
                <h4>Contact us</h4>
                <p>
                    For more information about our privacy practices, if you
                    have questions, or if you would like to make a complaint,
                    please contact us by{" "}
                    <a href="mailto:hassan.andrabi@unimelb.edu.au">e-mail</a>.
                </p>
            </article>
        </Container>
    );
}

PrivacyPolicy.getLayout = function getLayout(page) {
    return <Layout title="Privacy policy">{page}</Layout>;
};
