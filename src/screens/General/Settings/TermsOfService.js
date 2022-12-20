import React from "react";
import {
  View,
  Text,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Image,
  Platform,
  SafeAreaView,
  Linking,
} from "react-native";
import { Header } from "../../../components";
import withGeneralBackground from "../../../hoc/withGeneralBackground";
import { COLORS, FONTS, global, SIZES, THEMES } from "../../../constants";
import { useBottomTabBarHeight } from "@react-navigation/bottom-tabs";

function TermsOfService({ navigation, themes }) {
  const scrollViewBottom = useBottomTabBarHeight();

  const styles = StyleSheet.create({
    haederWrap: {
      marginBottom: 15,
    },

    header: {
      ...global.h4dark,
      color: COLORS.white,
      textAlign: "center",
      lineHeight: 27,
    },
    paragraph: {
      flexDirection: "row",
      marginBottom: 20,
    },
    subParagraph: {
      flexDirection: "row",
      marginBottom: 20,
      marginLeft: 15,
    },
    text: {
      ...global.p5dark,
      color: COLORS.lightGray,
      lineHeight: 23,
    },
    boldText: {
      ...global.h5dark,
      color: COLORS.white,
      lineHeight: 23,
    },
    italicText: {
      fontSize: SIZES.t5,
      fontFamily: FONTS.sfRegularItalic,
      color: COLORS.lightGray,
    },
    boldItalicText: {
      fontSize: SIZES.t5,
      fontFamily: FONTS.sfBoldItalic,
      color: COLORS.white,
    },
    boldSmallText: {
      ...global.h5dark,
      color: COLORS.white,
      lineHeight: 23,
    },
    smallText: {
      ...global.p5dark,
      color: COLORS.lightGray,
      lineHeight: 23,
    },
    link: {
      color: COLORS.pastelBlue,
      flexDirection: "row",
    },
    scrollview: {
      flex: 1,
      marginBottom:
        Platform.OS === "ios" ? scrollViewBottom + 5 : scrollViewBottom + 40,
    },
    underlinedText: {
      // ...global.p5dark,
      color: COLORS.white,
      lineHeight: 23,
      textDecorationLine: "underline",
    },
    underlinedBoldText: {
      ...global.h5dark,
      color: COLORS.white,
      lineHeight: 23,
      textDecorationLine: "underline",
    },
  });

  const openLink = (url) => {
    Linking.canOpenURL(url).then((supported) => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + this.props.url);
      }
    });
  };

  return (
    <SafeAreaView style={global.container}>
      <View>
        <Header
          header="Terms of service"
          backButtonEvent={() => {
            navigation.goBack();
          }}
          role="client"
        />
      </View>
      <ScrollView
        style={styles.scrollview}
        showsVerticalScrollIndicator={false}
      >
        {/* header */}
        <View style={styles.haederWrap}>
          <Text style={styles.header}>Compassly Terms of Use</Text>
          <Text style={styles.header}>Effective Date: March 10th, 2022</Text>
          <Text style={styles.header}>Last Updated Date: March 10th, 2022</Text>
        </View>

        {/* intro */}
        <View style={styles.paragraph}>
          <Text style={styles.text}>
            PLEASE READ THESE TERMS OF USE AGREEMENT (THE
            <Text style={styles.boldText}> "TERMS"</Text>) CAREFULLY AS THEY
            FORM A BINDING LEGAL AGREEMENT BETWEEN YOU AND COMPASSLY LLC.
            (“COMPASSLY” OR <Text style={styles.boldText}>“WE:</Text> AND ITS
            DERIVATIVES). THIS SITE AND ANY OTHER SITES OF Compassly
            (COLLECTIVELY, THE <Text style={styles.boldText}>“SITE”</Text>) AND
            THE INFORMATION ON IT ARE CONTROLLED BY COMPASSLY. THESE TERMS
            GOVERN THE USE OF THE SITE AND APPLY TO ALL VISITORS TO THE SITE AND
            THOSE WHO USE THE DATA COLLECTION MANAGEMENT SOFTWARE THAT IS
            DOWNLOADABLE FROM THE SITE (THE{" "}
            <Text style={styles.boldText}>“SOFTWARE”</Text>), AS WELL AS OTHER
            SERVICES AND RESOURCES AVAILABLE OR ENABLED VIA THE SITE, (EACH A
            <Text style={styles.boldText}></Text>“SERVICE” AND COLLECTIVELY, THE{" "}
            <Text style={styles.boldText}>“SERVICES”</Text>, WHICH TERM INCLUDES
            THE SOFTWARE AND THE SITE UNLESS EXPLICITLY SET FORTH BELOW). BY
            CLICKING ON THE “I ACCEPT” BUTTON, COMPLETING THE REGISTRATION
            PROCESS, DOWNLOADING THE SOFTWARE AND/OR BROWSING THE SITE, YOU
            REPRESENT THAT (1) YOU HAVE READ, UNDERSTAND, AND AGREE TO BE BOUND
            BY THE TERMS, (2) YOU ARE OF LEGAL AGE TO FORM A BINDING CONTRACT
            WITH Compassly, AND (3) YOU HAVE THE AUTHORITY TO ENTER INTO THE
            TERMS PERSONALLY OR ON BEHALF OF THE LEGAL ENTITY ON FOR WHOM YOU
            ARE USING THE SERVICES. THE TERM “YOU” REFERS TO YOU INDIVIDUALLY OR
            THE LEGAL ENTITY ON WHOSE BEHALF THE SERVICES ARE USED, AS
            APPLICABLE.{" "}
            <Text style={styles.boldText}>
              IF YOU DO NOT AGREE TO BE BOUND BY THE TERMS, YOU MAY NOT ACCESS
              OR USE THE SERVICES.
            </Text>
          </Text>
        </View>
        <View style={styles.paragraph}>
          <Text style={styles.text}>
            SECTION 10 OF THE TERMS CONTAINS AN ARBITRATION AGREEMENT WHICH
            WILL, WITH LIMITED EXCEPTIONS, REQUIRE DISPUTES BETWEEN YOU AND
            Compassly TO BE SUBMITTED TO BINDING AND FINAL ARBITRATION. UNLESS
            YOU OPT OUT OF THE ARBITRATION AGREEMENT: (1) YOU WILL ONLY BE
            PERMITTED TO PURSUE CLAIMS AND SEEK RELIEF AGAINST US ON AN
            INDIVIDUAL BASIS, NOT AS A PLAINTIFF OR CLASS MEMBER IN ANY CLASS OR
            REPRESENTATIVE ACTION OR PROCEEDING; AND (2) YOU ARE WAIVING YOUR
            RIGHT TO SEEK RELIEF IN A COURT OF LAW AND TO HAVE A JURY TRIAL ON
            YOUR CLAIMS.
          </Text>
        </View>
        <View style={styles.paragraph}>
          <Text style={styles.text}>
            Compassly may modify these Terms at any time and in our sole
            discretion. If we do so, we will change the “Last Updated” date at
            the beginning of these Terms and, as available. By Continuing to use
            the Site or Services following the release of updated Terms, you
            consent to the updated Terms. We invite you to check this page
            regularly for updates to these Terms.
          </Text>
        </View>
        {/* ./intro */}

        {/* 1 part */}
        <View style={styles.paragraph}>
          <Text style={styles.text}>
            <Text style={styles.underlinedBoldText}>
              1. Use of the Services.
            </Text>{" "}
            The Software, the Site, the Services, and the information and
            content available therein{" "}
            <Text style={styles.boldText}>(“Compassly Content”) </Text>are
            protected worldwide by copyright laws. Subject to the Terms,
            Compassly grants you a limited license to reproduce portions of
            Compassly Content solely as required to use the Services for your
            personal or internal business purposes. Unless otherwise specified
            by Compassly in a separate license, your right to use any Compassly
            Content is subject to these Terms.{" "}
            <Text style={styles.boldText}>
              Compassly is not a bank or financial institution and does not
              provide investment or financial advice or consulting services to
              users of the Services. We are solely the provider of the Services.
            </Text>
          </Text>
        </View>
        <View style={styles.subParagraph}>
          <Text style={styles.text}>
            {" "}
            <Text style={styles.boldText}> 1.1. Compassly Software.</Text> Use
            of the Software is governed by these Terms. Compassly delivers the
            Software via download and Compassly will not provide you with any
            tangible copy of the Software. Subject to your compliance with the
            Terms, Compassly grants you a nonassignable, non-transferable,
            non-sublicensable, revocable, and non-exclusive license to use the
            Software on computers you own or control solely for your personal or
            internal business purposes.{" "}
            <Text style={styles.boldText}>
              Because the Software is locally installed, you are responsible for
              the security of the device on which it is installed, including
              ensuring that you keep anti-virus software current and otherwise
              protect the device on which the Software is installed against
              malware. Compassly is not responsible for any loss or damages –
              including loss of funds or lockout from accounts accessed via the
              Software – resulting from your failure to keep the device on which
              the Software is installed safe and free of any malware. Compassly
              cannot recover passwords or unlock account information stored on
              the Software in any circumstances, including if the Software is
              compromised by malware on your computer, and it is your sole
              responsibility to take all reasonable precautions to secure and
              backup your copy of the Software and the information stored on it.
            </Text>
          </Text>
        </View>
        <View style={styles.subParagraph}>
          <Text style={styles.text}>
            {" "}
            <Text style={styles.boldText}> 1.2. Updates.</Text>
            <Text>
              The Software and Services are evolving and you may be required to
              accept or install updates to the Software or Services, or update
              third-party software (i.e., browsers or OS) in order to keep using
              the Software or Services or access their latest features,
              including security updates. We may update the Software and
              Services at any time, without providing notice.{" "}
            </Text>
          </Text>
        </View>
        <View style={styles.subParagraph}>
          <Text style={styles.text}>
            {" "}
            <Text style={styles.boldText}> 1.3. Certain Restrictions.</Text>
            <Text>
              {" "}
              By accessing the Services, you agree not to: (a) license, sell,
              rent, lease, transfer, assign, reproduce, distribute, host or
              otherwise commercially exploit the Services or Compassly Content,
              or any portion thereof, including on a service bureau or
              equivalent basis; (b) frame or enclose any trademark, logo, or
              other Compassly Content, (including images, text, page layout or
              form); (c) use any metatags or other “hidden text” using
              Compassly’ name or trademarks; (d) modify, translate, adapt,
              merge, make derivative works of, disassemble, decompile, reverse
              compile or reverse engineer any part of the Services or Software
              (except to the extent this restriction is expressly prohibited by
              applicable law); (e) use any manual or automated software, devices
              or other processes (including spiders or other data mining tools)
              to “scrape” or download data from any web pages in the Site
              (except that we grant operators of public search engines revocable
              permission to do so for the sole purpose of creating publicly
              available searchable indices (but not caches or archives) of such
              content; (f) access the Site, Services, or Software in order to
              build a similar or competitive Site, Services, or Software; (g)
              copy, reproduce, distribute, republish, download, display, post or
              transmit any Compassly Content except as expressly permitted
              herein; and (h) remove or destroy any copyright notices or other
              proprietary markings contained on or in the Services or Compassly
              Content. Compassly, its suppliers and service providers reserve
              all rights not granted in the Terms. Any unauthorized use of the
              Services terminates the licenses granted by Compassly herein.
            </Text>
          </Text>
        </View>
        <View style={styles.subParagraph}>
          <Text style={styles.text}>
            {" "}
            <Text style={styles.boldText}>
              {" "}
              1.4. Third-Party API Providers.
            </Text>
            <Text>
              {" "}
              Access to Third Party API Providers may be geo-blocked for
              residents of certain countries and certain states of the United
              States. There can be no assurance that any security measures that
              we or our third-party service providers have implemented will be
              effective against current or future security threats. While we
              take steps in an effort to protect the security of our platform
              and the availability, integrity, confidentiality and security of
              our data, our security measures or those of our third-party
              providers could fail and result in unauthorized access to or use
              of our platform or unauthorized, accidental or unlawful access to,
              or disclosure, modification, misuse, loss or destruction of, our
              or our customers’ data. Private keys may also be compromised if
              customers choose to store their private keys in non-secure
              systems, such as third-party email services, which may be
              susceptible to security breaches and security incidents, despite
              our efforts to discourage our customers from engaging in these
              practices. Although such incidents are outside of our control and
              do not relate to any insecurity or vulnerability on the part of
              the Compassly Platform, customers may nevertheless blame or become
              dissatisfied with the Compassly Platform as a result of these
              negative experiences.{" "}
              <Text style={styles.boldText}>
                Do not share any credential, private key, or other sensitive
                information with any third party without validating their
                legitimacy.
              </Text>{" "}
              Third Party API Providers are available to you, subject to the
              terms and conditions of each third party provider. To the extent
              Third Party API Providers have terms that differ from these Terms,
              you may be required to agree to those terms in order to access
              their Software, Site, or Services.{" "}
              <Text style={styles.boldText}>
                We do not control the terms, policies, or performance of any
                third party, and are not responsible for any performance, or
                failure to perform, of any Third Party Software, Site, or
                Services, including exchange rates, processing of transactions,
                and similar activities. We do not provide customer support for
                transactions performed on third-party API provider’s Software,
                Site, or Services. When you leave the Compassly software and
                access the third-party's software, their Terms of Service govern
                the transaction
              </Text>
            </Text>
          </Text>
        </View>
        <View style={styles.subParagraph}>
          <Text style={styles.text}>
            {" "}
            <Text style={styles.boldText}> 1.5. User Content.</Text>
            <Text>
              {" "}
              You are responsible for all data and information provided or
              uploaded by you to the Services{" "}
              <Text style={styles.boldText}>(“User Content”)</Text>, whether
              publicly posted (i.e., in a user forum, if applicable) or
              privately transmitted (i.e., to us in connection with a support
              request). You are solely responsible for the accuracy and
              completeness of User Content you submit, and represent and warrant
              that you have all rights required in order to post such User
              Content. We may, in our sole discretion, delete any User Content
              that we determine violates these Terms. To the extent that you
              provide us with or we may have access to any information that
              allows us to identify you or any other individual{" "}
              <Text style={styles.boldText}>(“Personal Information”)</Text> in
              connection with your use of the Services, we will preserve,
              safeguard, and use such information as set forth in our Privacy
              Policy.
            </Text>
          </Text>
        </View>
        <View style={styles.subParagraph}>
          <Text style={styles.text}>
            {" "}
            <Text style={styles.boldText}>
              1.6. Necessary Equipment and Software.
            </Text>
            <Text>
              {" "}
              You must provide all equipment and software necessary to connect
              to use the Services. You are solely responsible for any fees,
              including Internet connection or mobile fees, that you incur when
              accessing or using the Services.
            </Text>
          </Text>
        </View>

        {/* 2 part */}
        <View style={styles.paragpaph}>
          <Text style={styles.boldText}>2. Ownership.</Text>
        </View>
        <View style={styles.subParagraph}>
          <Text style={styles.text}>
            {" "}
            <Text style={styles.boldText}>2.1. Generally.</Text>
            <Text>
              {" "}
              Compassly and its suppliers own all right, title and interest in
              and to the Compassly content contained within the Software, Site,
              and Services. You will not remove, alter or obscure any copyright,
              trademark, service mark or other proprietary rights notices
              incorporated in or accompanying the Compassly Content.
            </Text>
          </Text>
        </View>

        <View style={styles.subParagraph}>
          <Text style={styles.text}>
            {" "}
            <Text style={styles.boldText}>2.2. Trademarks.</Text>
            <Text>
              {" "}
              Compassly Movement, Inc. and other related graphics, logos,
              service marks and trade names used on or in connection with the
              Services are the trademarks of Compassly and may not be used
              without permission in connection with any third-party products or
              services. Other trademarks, service marks and trade names that may
              appear on or in the Site or Services are the property of their
              respective owners.
            </Text>
          </Text>
        </View>

        <View style={styles.subParagraph}>
          <Text style={styles.text}>
            {" "}
            <Text style={styles.boldText}>2.3. User Content.</Text>
            <Text>
              {" "}
              You own your User Content. By posting, displaying, sharing or
              distributing User Content on or through the Software, Site, or
              Services, you grant us, and any Third Party API Provider used in
              connection with the Services, a nonexclusive license to use the
              User Content solely for the purpose of operating the Services.
              Except as prohibited by applicable law, we may disclose any
              information in our possession (including User Content) in
              connection with your use of the Services, to (a) comply with legal
              process; (b) enforce these Terms, (c) respond to your requests for
              customer service, or (d) protect the rights, property or personal
              safety of Compassly, our employees, directors or officers,
              partners and agents, or members of the public.
            </Text>
          </Text>
        </View>

        <View style={styles.subParagraph}>
          <Text style={styles.text}>
            {" "}
            <Text style={styles.boldText}>2.4. Feedback.</Text>
            <Text>
              {" "}
              You may provide ideas, suggestions, documents, and/or proposals
              about the Services to Compassly through any means{" "}
              <Text style={styles.boldText}></Text>, and you grant Compassly a
              fully paid, royalty-free, perpetual, irrevocable, worldwide,
              non-exclusive, and sublicensable right and license to use Feedback
              for any legitimate purpose.
            </Text>
          </Text>
        </View>

        {/* 3 part */}
        <View style={styles.paragraph}>
          <Text style={styles.text}>
            {" "}
            <Text style={styles.boldText}>3. User Conduct.</Text>
            <Text>
              {" "}
              You may not use the Software, Site, or Services for any purpose
              that is prohibited by the Terms or applicable law. You will not
              (and will not permit any third party to) take any action or make
              available any content on or through the Site, Software, or
              Services that: (a) infringes any intellectual property rights of
              any person or entity; (b) is unlawful, threatening, harassing,
              defamatory, libellous, deceptive, fraudulent, invasive of
              another’s privacy, tortious, obscene, or offensive; (c) is
              unauthorized or unsolicited advertising, junk or bulk e-mail; (d)
              involves commercial activities and/or sales, such as contests,
              sweepstakes, barter, advertising, or pyramid schemes; (e)
              impersonates any person or entity, including any employee or
              representative of Compassly; (f) interferes with the proper
              functioning of the Software, Site, or Services; (g) engages in any
              potentially harmful acts directed against the Software, Site, or
              Services, including violating any security features, introducing
              viruses, worms, or similar harmful code into the Software, Site,
              or Services; or (h) attempts to do any of the foregoing.
            </Text>
          </Text>
        </View>

        {/* 4 part */}
        <View style={styles.paragraph}>
          <Text style={styles.text}>
            {" "}
            <Text style={styles.boldText}>4. Investigations.</Text>
            <Text>
              {" "}
              Although Compassly does not generally monitor user activity on the
              Software, Site or Services, if Compassly becomes aware of any
              possible violations by you of any provision of the Terms,
              Compassly may investigate such violations, at its sole discretion;
              take any of the actions set forth in Section 10 below.
            </Text>
          </Text>
        </View>

        {/* 5 part */}
        <View style={styles.paragraph}>
          <Text style={styles.text}>
            {" "}
            <Text style={styles.boldText}>5. Indemnification. </Text>
            <Text>
              {" "}
              You agree to indemnify and hold Compassly harmless from any
              losses, costs, liabilities and expenses (including reasonable
              attorneys’ fees) relating to or arising out of: (a) your use of,
              or inability to use, the Software, Site, or Services; (b) your
              violation of the Terms; (c) your violation of any rights of
              another party, including any other users of the Software, Site, or
              Services; or (d) your violation of any applicable laws, rules or
              regulations. Compassly may, at its own cost, assume the exclusive
              defense and control of any matter otherwise subject to
              indemnification by you, in which event you will fully cooperate
              with Compassly in asserting any available defenses. This provision
              does not require you to indemnify any Compassly Party for any
              fraud, gross negligence, or wilful misconduct in connection with
              the Services.
            </Text>
          </Text>
        </View>

        {/* 6 part */}
        <View style={styles.paragraph}>
          <Text style={styles.text}>
            {" "}
            <Text style={styles.boldText}>6. Disclaimer of Warranties. </Text>
            <Text>
              {" "}
              You agree to indemnify and hold Compassly harmless from any
              losses, costs, liabilities and expenses (including reasonable
              attorneys’ fees) relating to or arising out of: (a) your use of,
              or inability to use, the Software, Site, or Services; (b) your
              violation of the Terms; (c) your violation of any rights of
              another party, including any other users of the Software, Site, or
              Services; or (d) your violation of any applicable laws, rules or
              regulations. Compassly may, at its own cost, assume the exclusive
              defense and control of any matter otherwise subject to
              indemnification by you, in which event you will fully cooperate
              with Compassly in asserting any available defenses. This provision
              does not require you to indemnify any Compassly Party for any
              fraud, gross negligence, or wilful misconduct in connection with
              the Services.
            </Text>
          </Text>
        </View>

        <View style={styles.subParagraph}>
          <Text style={styles.text}>
            {" "}
            <Text style={styles.boldText}>6.1. As Is.</Text>
            <Text>
              {" "}
              THE SOFTWARE, SITE, AND SERVICES ARE PROVIDED ON AN “AS IS” AND
              “AS AVAILABLE” BASIS, WITH ALL FAULTS, AND Compassly EXPRESSLY
              DISCLAIMS ALL WARRANTIES, REPRESENTATIONS, AND CONDITIONS OF ANY
              KIND ARISING FROM OR RELATED TO THESE TERMS OR YOUR USE OF THE
              SITE, SERVICES, AND SOFTWARE, INCLUDING THE IMPLIED WARRANTIES OF
              MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE. YOU
              ACKNOWLEDGE THAT, TO THE EXTENT ALLOWED BY APPLICABLE LAW, ALL
              RISK OF USE OF THE SITE, SERVICES, AND SOFTWARE RESTS ENTIRELY
              WITH YOU.
            </Text>
          </Text>
        </View>

        <View style={styles.subParagraph}>
          <Text style={styles.text}>
            {" "}
            <Text style={styles.boldText}>6.2. Beta Releases.</Text>
            <Text>
              FROM TIME TO TIME, COMPASSLY MAY OFFER NEW “BETA” FEATURES OR
              TOOLS WITH WHICH ITS USERS MAY EXPERIMENT. SUCH FEATURES OR TOOLS
              ARE OFFERED SOLELY FOR EXPERIMENTAL PURPOSES, WITHOUT ANY WARRANTY
              OF ANY KIND, AND MAY BE MODIFIED OR DISCONTINUED AT COMPASSLY’S
              SOLE DISCRETION.
            </Text>
          </Text>
        </View>

        <View style={styles.paragraph}>
          <Text style={styles.text}>
            {" "}
            <Text style={styles.boldText}>Third Party Conduct. </Text>
            <Text>
              {" "}
              Compassly IS NOT LIABLE, AND YOU AGREE NOT TO SEEK TO HOLD
              COMPASSLY LIABLE, FOR THE CONDUCT OF THIRD PARTIES ON OR ACCESSED
              VIA THE SOFTWARE, SITE, OR SERVICES, INCLUDING THE USE OFTHIRD
              PARTY{" "}
              <Text style={styles.underlinedText}>
                API PROVIDERS’S SOFTWARE AND OR SERVICES. THE RISK OF INJURY
                FROM USE OF SUCH THIRD PARTY SOFTWARE AND SERVICES RESTS
                ENTIRELY WITH YOU .
              </Text>
            </Text>
          </Text>
        </View>

        {/* 7 part */}
        <View style={styles.paragraph}>
          <Text style={styles.text}>
            {" "}
            <Text style={styles.boldText}>7. Limitation of Liability.</Text>
          </Text>
        </View>

        <View style={styles.subParagraph}>
          <Text style={styles.text}>
            {" "}
            <Text style={styles.boldText}>7.1. Disclaimer. </Text>
            <Text>
              {" "}
              IN NO EVENT WILL Compassly BE LIABLE FOR ANY LOST PROFITS, REVENUE
              OR DATA, INDIRECT, INCIDENTAL, SPECIAL, OR CONSEQUENTIAL DAMAGES,
              OR DAMAGES OR COSTS DUE TO LOSS OF PRODUCTION OR USE, BUSINESS
              INTERRUPTION, OR PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES
              ARISING OUT OF OR IN CONNECTION WITH THE SERVICES, WHETHER OR NOT
              Compassly HAS BEEN ADVISED OF THE POSSIBILITY OF SUCH DAMAGES, AND
              REGARDLESS OF THE THEORY OF LIABILITY ASSERTED.
            </Text>
          </Text>
        </View>

        <View style={styles.subParagraph}>
          <Text style={styles.text}>
            {" "}
            <Text style={styles.boldText}>7.2. Cap on Liability.</Text>
            <Text>
              {" "}
              UNDER NO CIRCUMSTANCES WILL Compassly BE LIABLE TO YOU FOR DAMAGES
              ARISING OUT OF THE USE OF OUR SOFTWARE, SITE, OR SERVICES
              EXCEEDING $1000.
            </Text>
          </Text>
        </View>

        <View style={styles.subParagraph}>
          <Text style={styles.text}>
            {" "}
            <Text style={styles.boldText}>7.3. Exceptions.</Text>
            <Text style={styles.smallText}>
              {" "}
              The limitations in Sections 8.1 and 8.2 will not apply to damages
              caused by the fraud, gross negligence, or wilful misconduct of
              Compassly, or to the extent such limitations are precluded by
              applicable law (in which case Compassly’ liability will be
              increased to the minimum amount required to comply with such law).
            </Text>
          </Text>
        </View>

        {/* 8 part */}
        <View style={styles.paragraph}>
          <Text style={styles.text}>
            {" "}
            <Text style={styles.boldText}>8. Term and Termination.</Text>
            <Text>
              {" "}
              The limitations in Sections 8.1 and 8.2 will not apply to damages
              caused by the fraud, gross negligence, or wilful misconduct of
              Compassly, or to the extent such limitations are precluded by
              applicable law (in which case Compassly’ liability will be
              increased to the minimum amount required to comply with such law).
            </Text>
          </Text>
        </View>

        <View style={styles.subParagraph}>
          <Text style={styles.smallText}>
            {" "}
            <Text style={styles.boldText}>8.1. Term.</Text>
            <Text style={styles.smallText}>
              {" "}
              The Terms commence on the date when you accept them (as described
              in the preamble above) and remain in full force and effect for so
              long as you access or use the Software, Site, or Services, unless
              terminated earlier in accordance with this Section 9.
            </Text>
          </Text>
        </View>

        <View style={styles.subParagraph}>
          <Text style={styles.smallText}>
            {" "}
            <Text style={styles.boldText}>8.2. Termination by Compassly.</Text>
            <Text style={styles.smallText}>
              {" "}
              Compassly may, at any time and for any reason, cease providing any
              or all of the Software, Site, or Services, and/or terminate the
              Terms. Without limiting the foregoing, we may also terminate your
              access to any or all of the Compassly content.
            </Text>
          </Text>
        </View>

        <View style={styles.subParagraph}>
          <Text style={styles.smallText}>
            {" "}
            <Text style={styles.boldText}>8.3. Termination by You.</Text>
            <Text style={styles.smallText}>
              {" "}
              Except as set forth in Section 9.4, these Terms will be of no
              further force and effect with respect to you if you cease all use
              of the Services and Software and no longer visit the Site.
            </Text>
          </Text>
        </View>

        <View style={styles.subParagraph}>
          <Text style={styles.smallText}>
            {" "}
            <Text style={styles.boldText}>8.4. Effect of Termination.</Text>
            <Text style={styles.smallText}>
              {" "}
              Upon termination of any Service, your right to use the Software,
              Site, and Service will automatically terminate immediately.
              Compassly will not have any liability whatsoever to you for any
              suspension or termination. All provisions of the Terms which by
              their nature should survive termination of Services will do so,
              including Sections 2, 6, 7, 8, 9.4, 10 and 11.
            </Text>
          </Text>
        </View>

        {/* 9 part */}
        <View style={styles.paragraph}>
          <Text style={styles.text}>
            {" "}
            <Text style={styles.boldText}>9. Dispute Resolution.</Text>
            <Text style={styles.boldItalicText}>
              {" "}
              Please read this Section 10 (the “Arbitration Agreement”)
              carefully. It requires you to arbitrate disputes with Compassly
              and limits the manner in which you can seek relief.
            </Text>
          </Text>
        </View>

        <View style={styles.subParagraph}>
          <Text style={styles.smallText}>
            {" "}
            <Text style={styles.underlinedText}>
              9.1. Applicability of Arbitration.
            </Text>
            <Text style={styles.smallText}>
              {" "}
              You agree that any dispute or claim relating in any way to your
              access or use of the Site, Services, or Software, or to any aspect
              of your relationship with Compassly, will be resolved by binding
              arbitration, rather than in court, except that (1) you may assert
              claims in small claims court if your claims qualify, so long as
              the matter remains in such court and advances only on an
              individual (non-class, non-representative) basis; and (2) you or
              Compassly may seek equitable relief in court for infringement or
              other misuse of intellectual property rights (such as trademarks,
              trade dress, domain names, trade secrets, copyrights, and
              patents).{" "}
              <Text style={styles.boldSmallText}>
                This Arbitration Agreement will apply, without limitation, to
                all claims that arose or were asserted before the Effective Date
                of this Agreement or any prior version of this Agreement.
              </Text>
            </Text>
          </Text>
        </View>

        <View style={styles.paragraph}>
          <Text style={styles.text}>
            <Text style={styles.boldText}>
              IF YOU AGREE TO ARBITRATION WITH COMPASSLY, YOU ARE AGREEING IN
              ADVANCE THAT YOU WILL NOT PARTICIPATE IN OR SEEK TO RECOVER
              MONETARY OR OTHER RELIEF IN ANY LAWSUIT FILED AGAINST COMPASSLY
              ALLEGING CLASS, COLLECTIVE, AND/OR REPRESENTATIVE CLAIMS ON YOUR
              BEHALF. INSTEAD, YOU MAY BRING YOUR CLAIMS AGAINST Compassly IN AN
              INDIVIDUAL ARBITRATION PROCEEDING. IF SUCCESSFUL ON SUCH CLAIMS,
              YOU COULD BE AWARDED MONEY OR OTHER RELIEF BY AN ARBITRATOR. YOU
              ACKNOWLEDGE THAT YOU HAVE BEEN ADVISED THAT YOU MAY CONSULT WITH
              AN ATTORNEY IN DECIDING WHETHER TO ACCEPT THESE TERMS, INCLUDING
              THIS ARBITRATION AGREEMENT.{" "}
            </Text>
          </Text>
        </View>

        <View style={styles.subParagraph}>
          <Text style={styles.smallText}>
            {" "}
            <Text style={styles.underlinedText}>
              9.2. Arbitration Rules and Forum.
            </Text>
            <Text style={styles.smallText}>
              {" "}
              The Federal Arbitration Act governs the interpretation and
              enforcement of this Arbitration Agreement. To begin an arbitration
              proceeding, you must send a letter requesting arbitration and
              describing your claim to our registered agent Compassly LLC. 348 E
              600 S St George UT. 84770. The arbitration will be conducted by
              JAMS, an established alternative dispute resolution provider.
              Disputes involving claims and counterclaims under $250,000, not
              inclusive of attorneys’ fees and interest, will be subject to
              JAMS’s most current version of the Streamlined Arbitration Rules
              and procedures available at{" "}
              <Text
                style={styles.link}
                onPress={() =>
                  openLink(
                    "http://www.jamsadr.com/rules-streamlined-arbitration/"
                  )
                }
              >
                {" "}
                http://www.jamsadr.com/rules-streamlined-arbitration/
              </Text>{" "}
              all other claims will be subject to JAMS’s most current version of
              the Comprehensive Arbitration Rules and Procedures, available at
              <Text
                style={styles.link}
                onPress={() =>
                  openLink(
                    "http://www.jamsadr.com/rules-comprehensive-arbitration/"
                  )
                }
              >
                {" "}
                http://www.jamsadr.com/rules-comprehensive-arbitration/
              </Text>
              . JAMS’s rules are also available at www.jamsadr.com or by calling
              JAMS at 800-352-5267. If JAMS is not available to arbitrate, the
              parties will select an alternative arbitral forum. If the
              arbitrator finds that you cannot afford to pay JAMS’s filing,
              administrative, hearing and/or other fees and cannot obtain a
              waiver from JAMS, Compassly will pay them for you. In addition,
              Compassly will reimburse all such JAMS’s filing, administrative,
              hearing and/or other fees for claims totalling less than $10,000
              unless the arbitrator determines the claims are frivolous.
              Likewise, Compassly will not seek attorneys’ fees and costs in
              arbitration unless the arbitrator determines the claims are
              frivolous.
            </Text>
          </Text>
        </View>

        <View style={styles.paragraph}>
          <Text style={styles.smallText}>
            {" "}
            You may choose to have the arbitration conducted by telephone, based
            on written submissions, or in person in New Castle County, Delaware.
            Any judgment on the award rendered by the arbitrator may be entered
            in any court of competent jurisdiction. All arbitration pleadings
            and proceedings will be conducted in English.
          </Text>
        </View>

        <View style={styles.subParagraph}>
          <Text style={styles.smallText}>
            {" "}
            <Text style={styles.underlinedText}>
              9.3. Authority of Arbitrator.
            </Text>{" "}
            The arbitrator, and not any federal, state or local court or agency
            will have exclusive authority to (a) determine the scope and
            enforceability of this Arbitration Agreement and (b) resolve any
            dispute related to the interpretation, applicability, enforceability
            or formation of this Arbitration Agreement including, but not
            limited to any claim that all or any part of this Arbitration
            Agreement is void or voidable. The arbitration will decide the
            rights and liabilities, if any, of you and Compassly. The
            arbitration proceeding will not be consolidated with any other
            matters or joined with any other cases or parties. The arbitrator
            will have the authority to grant motions dispositive of all or part
            of any claim. The arbitrator will have the authority to award
            monetary damages and to grant any non-monetary remedy or relief
            available to an individual under applicable law, the arbitral
            forum’s rules, and the Agreement (including the Arbitration
            Agreement). The arbitrator will issue a written award and statement
            of decision describing the essential findings and conclusions on
            which the award is based, including the calculation of any damages
            awarded. The arbitrator has the same authority to award relief on an
            individual basis that a judge in a court of law would have. The
            award of the arbitrator is final and binding upon you and us.
          </Text>
        </View>

        <View style={styles.subParagraph}>
          <Text style={styles.smallText}>
            {" "}
            <Text style={styles.underlinedText}>
              9.4. Waiver of Jury Trial.
            </Text>{" "}
            YOU AND <Text style={styles.boldText}>COMPASSLY</Text> HEREBY WAIVE
            ANY CONSTITUTIONAL AND STATUTORY RIGHTS TO SUE IN COURT AND HAVE A
            TRIAL IN FRONT OF A JUDGE OR A JURY. You and Compassly are instead
            electing that all claims and disputes will be resolved by
            arbitration under this Arbitration Agreement, except as specified in
            Section 10.1 above. An arbitrator can award on an individual basis
            the same damages and relief as a court and must follow this
            Agreement as a court would. However, there is no judge or jury in
            arbitration, and court review of an arbitration award is subject to
            very limited review.
          </Text>
        </View>

        <View style={styles.subParagraph}>
          <Text style={styles.smallText}>
            {" "}
            <Text style={styles.underlinedText}>
              9.5. Waiver of Class or Consolidated Actions.
            </Text>{" "}
            ALL CLAIMS AND DISPUTES WITHIN THE SCOPE OF THIS ARBITRATION
            AGREEMENT MUST BE ARBITRATED ON AN INDIVIDUAL BASIS AND NOT ON A
            CLASS BASIS, ONLY INDIVIDUAL RELIEF IS AVAILABLE, AND CLAIMS OF MORE
            THAN ONE CUSTOMER OR USER CANNOT BE ARBITRATED OR CONSOLIDATE WITH
            THOSE OF ANY OTHER CUSTOMER OR USER. Notwithstanding anything to the
            contrary herein, (a) representative action for public injunctive
            relief may be arbitrated on a class basis and (b) in the event that
            the foregoing sentence is deemed invalid or unenforceable with
            respect to a particular class or dispute for recovery of damages,
            neither you nor we are entitled to arbitration and instead claims
            and disputes will be resolved in a court as set forth in Section
            10.7.
          </Text>
        </View>

        <View style={styles.subParagraph}>
          <Text style={styles.smallText}>
            {" "}
            <Text style={styles.underlinedText}>
              9.6. 30-Day Right to Opt Out.
            </Text>{" "}
            You have the right to opt out of this Arbitration Agreement by
            sending written notice of your decision to opt out to the following
            address: Compassly Movement, Inc. 15418 Weir Street, No. 333 Omaha,
            NE 68137, or via email to support@Compassly.io, within 30 days after
            first becoming subject to this Arbitration Agreement. Notice must
            include your name and address and an unequivocal statement that you
            want to opt out of this Arbitration Agreement. If you opt out of
            this Arbitration Agreement, all other parts of the Terms will
            continue to apply to you. Opting out of this Arbitration Agreement
            has no effect on any other arbitration agreements that you may
            currently have, or may enter in the future, with us.
          </Text>
        </View>

        <View style={styles.subParagraph}>
          <Text style={styles.smallText}>
            {" "}
            <Text style={styles.underlinedText}>9.7. Severability.</Text> If any
            part of this Arbitration Agreement is found under the law to be
            invalid or unenforceable, then such part will be of no force and
            effect and will be severed and the remainder of the Arbitration
            Agreement will continue in full force and effect.
          </Text>
        </View>

        <View style={styles.subParagraph}>
          <Text style={styles.smallText}>
            {" "}
            <Text style={styles.underlinedText}>
              9.8. Survival of Agreement.
            </Text>{" "}
            This Arbitration Agreement will survive the termination of your
            relationship with Compassly.
          </Text>
        </View>

        <View style={styles.subParagraph}>
          <Text style={styles.smallText}>
            {" "}
            <Text style={styles.underlinedText}>9.9. Modification.</Text>{" "}
            Notwithstanding any provision in this Agreement to the contrary, we
            agree that if Compassly makes any future material change to this
            Arbitration Agreement, it will not apply to any individual claim(s)
            that you had already provided notice of to Compassly.
          </Text>
        </View>

        {/* 10 part */}
        <View style={styles.paragraph}>
          <Text style={styles.boldText}>10. General Provisions. </Text>
        </View>

        <View style={styles.subParagraph}>
          <Text style={styles.text}>
            {" "}
            <Text style={styles.boldText}>
              10.1. Electronic Communications.
            </Text>{" "}
            Communications between you and Compassly use electronic means,
            whether made via the Site or Services or sent via e-mail, or whether
            Compassly posts notices on the Site or Services. For contractual
            purposes, you (1) consent to receive communications from Compassly
            in an electronic form; and (2) agree that all terms and conditions,
            agreements, notices, disclosures, and other communications that
            Compassly provides to you electronically satisfy any legal
            requirement that such communications would satisfy if it were to be
            in writing. The foregoing does not affect your statutory rights.
          </Text>
        </View>

        <View style={styles.subParagraph}>
          <Text style={styles.text}>
            {" "}
            <Text style={styles.boldText}>10.2. Assignment.</Text> The Terms,
            and your rights and obligations hereunder, may not be assigned,
            subcontracted, delegated or otherwise transferred by you without
            Compassly’ prior written consent.
          </Text>
        </View>

        <View style={styles.subParagraph}>
          <Text style={styles.text}>
            {" "}
            <Text style={styles.boldText}>10.3. Force Majeure.</Text> Compassly
            will not be liable for any delay or failure to perform resulting
            from causes outside its reasonable control, including, but not
            limited to, acts of God, war, terrorism, riots, embargos, acts of
            civil or military authorities, fire, floods, accidents, strikes or
            shortages of transportation facilities, fuel, energy, labor or
            materials.
          </Text>
        </View>

        <View style={styles.subParagraph}>
          <Text style={styles.text}>
            {" "}
            <Text style={styles.boldText}>
              10.4. Questions, Complaints, Claims.{" "}
            </Text>{" "}
            If you have any questions, complaints or claims with respect to the
            Site, Services or Software, please contact us at:
            support@Compassly.io or at Compassly Movement, Inc. 15418 Weir
            Street, No. 333 Omaha, NE 68137. We will do our best to address your
            concerns.
          </Text>
        </View>

        <View style={styles.subParagraph}>
          <Text style={styles.text}>
            {" "}
            <Text style={styles.boldText}>10.5. Exclusive Venue. </Text> To the
            extent the parties are permitted under these Terms to initiate
            litigation in a court, both you and Compassly agree that all claims
            and disputes arising out of or relating to the Terms will be
            litigated exclusively in the state or federal courts located in New
            Castle County, Delaware.
          </Text>
        </View>

        <View style={styles.subParagraph}>
          <Text style={styles.text}>
            {" "}
            <Text style={styles.boldText}>10.6. Governing Law. </Text> THE TERMS
            AND ANY ACTION RELATED THERETO WILL BE GOVERNED AND INTERPRETED BY
            AND UNDER THE LAWS OF THE STATE OF DELAWARE, CONSISTENT WITH THE
            FEDERAL ARBITRATION ACT, WITHOUT GIVING EFFECT TO ANY PRINCIPLES
            THAT PROVIDE FOR THE APPLICATION OF THE LAW OF ANOTHER JURISDICTION.
            THE UNITED NATIONS CONVENTION ON CONTRACTS FOR THE INTERNATIONAL
            SALE OF GOODS DOES NOT APPLY TO THESE TERMS.
          </Text>
        </View>

        <View style={styles.subParagraph}>
          <Text style={styles.text}>
            {" "}
            <Text style={styles.boldText}>10.7. Notice. </Text> Where Compassly
            requires that you provide an e-mail address, you are responsible for
            providing Compassly with your most current e-mail address. In the
            event that the last e-mail address you provided to Compassly is not
            valid, or for any reason is not capable of delivering to you any
            notices required/ permitted by the Terms, Compassly’s dispatch of
            the e-mail containing such notice will nonetheless constitute
            effective notice. You may give notice to Compassly at the following
            address: Compassly Movement, Inc. 15418 Weir Street, No. 333, Omaha,
            NE 68137. Such notice will be deemed given when received by
            Compassly by letter delivered by nationally recognized overnight
            delivery service or first class postage prepaid mail at the above
            address.
          </Text>
        </View>

        <View style={styles.subParagraph}>
          <Text style={styles.text}>
            {" "}
            <Text style={styles.boldText}>10.8. Waiver. </Text> Any waiver or
            failure to enforce any provision of the Terms on one occasion will
            not be deemed a waiver of any other provision or of such provision
            on any other occasion.
          </Text>
        </View>

        <View style={styles.subParagraph}>
          <Text style={styles.text}>
            {" "}
            <Text style={styles.boldText}>10.9. Severability. </Text> If any
            portion of these Terms is held invalid or unenforceable, that
            portion will be construed in a manner to reflect, as nearly as
            possible, the original intention of the parties, and the remaining
            portions will remain in full force and effect.
          </Text>
        </View>

        <View style={styles.subParagraph}>
          <Text style={styles.text}>
            {" "}
            <Text style={styles.boldText}>10.10. Export Control. </Text> You may
            not use, export, import, or transfer the Services except as
            authorized by U.S. law, the laws of the jurisdiction in which you
            obtained the Services, and any other applicable laws. In particular,
            but without limitation, the Services may not be exported or
            re-exported (a) into any United States embargoed countries, or (b)
            to anyone on the U.S. Treasury Department’s list of Specially
            Designated Nationals or the U.S. Department of Commerce’s Denied
            Person’s List or Entity List. By using the Services, you represent
            and warrant that (i) you are not located in a country that is
            subject to a U.S. Government embargo, or that has been designated by
            the U.S. Government as a “terrorist supporting” country and (ii) you
            are not listed on any U.S. Government list of prohibited or
            restricted parties. You also will not use the Services for any
            purpose prohibited by U.S. law, including the development, design,
            manufacture or production of missiles, nuclear, chemical or
            biological weapons. You acknowledge and agree that products,
            services or technology provided by Compassly are subject to the
            export control laws and regulations of the United States. You will
            comply with these laws and regulations and will not, without prior
            U.S. government authorization, export, re-export, or transfer
            Compassly products, services or technology, either directly or
            indirectly, to any country in violation of such laws and regulations
          </Text>
        </View>

        <View style={styles.subParagraph}>
          <Text style={styles.text}>
            {" "}
            <Text style={styles.boldText}>10.11. Consumer Complaints. </Text> In
            accordance with California Civil Code §1789.3, you may report
            complaints to the Complaint Assistance Unit of the Division of
            Consumer Services of the California Department of Consumer Affairs
            by contacting them in writing at 1625 North Market Blvd., Suite N
            112, Sacramento, CA 95834, or by telephone at (800) 952-5210.
          </Text>
        </View>

        <View style={styles.subParagraph}>
          <Text style={styles.text}>
            {" "}
            <Text style={styles.boldText}>10.12. Entire Agreement. </Text> These
            Terms are the final, complete and exclusive agreement of the parties
            with respect to the subject matter hereof and supersedes and merges
            all prior discussions between the parties with respect to such
            subject matter.
          </Text>
        </View>

        <View style={{ height: 30 }}></View>
      </ScrollView>
    </SafeAreaView>
  );
}

// <View style={styles.paragpaph}></View>
// <Text style={styles.text}></Text>
// <Text style={styles.boldText}></Text>
// <Text> style={styles.smallText}</Text>

{
  /* <View style={styles.subParagraph}>
<Text style={styles.text}>
  {" "}
  <Text style={styles.boldText}>
    1.6. Necessary Equipment and Software.
  </Text>
  <Text>
    You must provide all equipment and software necessary to connect
    to use the Services. You are solely responsible for any fees,
    including Internet connection or mobile fees, that you incur when
    accessing or using the Services.
  </Text>
</Text>
</View> */
}

export default withGeneralBackground(TermsOfService);
