import React, { useEffect, useState } from "react";
import tradelogo from '../../components/Dashboard/tradekiya.png';
import { NavLink } from "react-router-dom";

import Footer from "../../components/Dashboard/Footer/Footer";




function TermsConditions() {

    return (
        <>
            <div className="container-fluid container-xl bodsug">
                <div className="dshb_header_div">
                <NavLink to="/">
                    <img src={tradelogo} alt="TradeKiya" style={{ width: '9rem' }} className="dshb_head_img" />
                </NavLink>
                </div>
                <div className="bidsfair">
                    <h1> TERMS & CONDITIONS </h1>
                    <h6 style={{fontSize:'15px',textAlign:'center'}}>PLEASE READ THESE TERMS AND CONDITIONS CAREFULLY BEFORE USING TradeKIA</h6>
                    <h2>Introduction</h2>
                    <p>
                        These User terms and conditions (together with the documents referred to in it) (“Terms”) are the terms on which you may make use of our website https://tradekia.com/ and the associated mobile and software applications (either existing or available in the future) and our digital assets trading services (“TradeKIA”), whether as a guest or a registered user. Use of our services includes accessing, browsing, or registering to use TradeKIA. Please read these Terms carefully before you start to use our services. We recommend that you print a copy of these Terms for future reference.
                    </p>

                    <p>
                        By using the TradeKIA, you confirm that you accept these Terms and that you agree to comply with them. If you do not agree to these Terms, you must not use our online platform. Please check this page regularly to apprise yourself of any updates made to the Terms of Service. We recommend that you print a copy of these Terms for future reference.
                    </p>

                    <ul>
                        <li>
                            <span>1. OTHER APPLICABLE TERMS</span>
                            <p>
                                These Terms refer to, incorporate, and include the following additional terms, which also apply to your use of our platform:---<br />
                                Our Privacy Policy sets out the terms on which we process any personal data we collect from you, or that you provide to us. By using our services, you consent to such processing and you warrant that all data provided by you is accurate.<br />
                                Our Anti-Money Laundering Policy sets out the terms regarding identity verification of our Users and the procedures followed for early identification and reporting of prohibited/illegal activities which may be committed by using our services. When using the TradeKIA, you must comply with the terms of the AML Policy.<br />

                            </p>
                        </li>

                        <li>
                            <span>2. ABOUT TradeKIA</span>
                            <p>
                                We provide access to an online digital assets exchange that currently facilitates the (i) online trading of Digital Assets including their sale and purchase (either using fiat currency or another form of Digital Assets), (ii) transfer of Funds from a User’s Fiat Wallet into its Linked Bank Account and vice versa, and (iii) online storage of Digital Assets owned by the Users (collectively the "Services"), operated by Nineteen Real Tech Lab India (the “Company” or “TradeKIA”) incorporated under the Indian Companies Act having its registered office at ground floor, Fairdeal Bhawan, B58, Vibhuti Khand, Gomti Nagar, Lucknow, Uttar Pradesh 226010.
                            </p>
                        </li>

                        <li>
                            <span>3. DEFINITIONS</span>
                            <p>
                                “Coin Wallet” means an online address accessible through TradeKIA and operated by a User for storage of its Digital Assets; “Content” means any information, text, graphics, or other materials uploaded by the Company or the users, which appears for other users to access.
                            </p>
                            <p>
                                “Digital Assets” refers to blockchain-based cryptocurrencies such as Bitcoins, Litecoin, Ethereum, Ripple, etc., as well as proprietary coins and tokens; “Fiat Wallet” means an online address accessible through and operated by a User for the storage of the User’s fiat currency holdings; “Funds” refers to both Digital Assets or fiat currency, as the case may be;
                            </p>
                            <p>
                                “Linked Bank Account” refers to any bank account owned and operated by the User and held with a Scheduled Commercial Bank, whose details were provided by the User during the activation process mentioned under Clause 7.1 herein;
                            </p>
                            <p>
                                “Sanctions Lists” has the meaning given to it under the AML Policy;
                            </p>
                            <p>
                                “Wallet(s)” refers to a User’s Coin Wallet and/or its Fiat Wallet, as the case may be;
                            </p>
                            <p>
                                Any reference to “you” or “your” or “user” refers to you as a user of TradeKIA and the Services and any reference to “we”, “our” and “us” shall refer to the Company as the provider of the Services.
                            </p>
                        </li>
                        <li>
                            <span>4. CHANGES TO THESE TERMS AND SERVICES</span>
                            <p>
                                4.1. We may revise these Terms at any time by amending this page. Please check this page from time to time to take notice of any changes we made, as they are binding on you. We reserve the right to review & withdraw or amend the services without any prior notice.
                            </p>

                            <p>
                                4.2. We may, without advance notice, change the Services; add or remove functionalities or features; stop providing the Services or features of the Services, to you or to users generally; or create usage limits for the Services.
                            </p>
                        </li>

                        <li>
                            <span>5. CHANGES TO TradeKIA</span>
                            <p>
                                5.1. We may update our platform from time to time, and may change the Content at any time. However, please note that any of the Content may be out of date at any given time and we are under no obligation to update it.
                            </p>
                            <p>
                                5.2. We do not guarantee that our platform, or any Content on it, will be free from errors or omissions.
                            </p>
                        </li>





                        <li>
                            <span>6. ACCESSING THE TradeKIA </span>
                            <p>6.1. We do not guarantee that your use of our services will always be uninterrupted or always available. Access to our platforms is permitted on a temporary basis. We may suspend, withdraw, discontinue or change all or any part of services that we provide without notice. We will not be liable to you including without limitation for any losses incurred due to volatility of prices of the Digital Assets if for any reason the services are unavailable at any time or for any period.
                            </p>
                            <p>6.2. You are also responsible for ensuring that all persons who access TradeKIA through your internet connection are aware of these Terms and other applicable terms and conditions and that they comply with them.
                            </p>
                        </li>

                        <li>
                            <span>7. YOUR ACCOUNT AND PASSWORD</span>

                            <p>7.1. If you choose to register an account will be created for your use and you will
                                be provided with the required Information to enable your access to the Account. In
                                order to access any Services, you must activate them (your “User Account”)
                                by following the identity verification process specified in the AML Policy.
                                Failure to complete its activation process as per the AML Policy will entitle
                                the Company to terminate the said User Account.
                            </p>
                            <p>The term “Account Information” refers to a password and such information which may be provided
                                by you as part of our security and verification procedures. If you register through any third-party
                                website like Gmail, the login information of such a third-party account, as the case may be, shall
                                be considered part of the Account Information. You must always treat Account Information as
                                confidential and must not disclose it to any third party. Any access to TradeKIA through
                                your Account shall be considered as an access by you or on your behalf and you shall be solely
                                responsible for any activity carried out in, by, or through your Account either on our platform
                                or any other website accessed by you through  TradeKIA.
                            </p>
                            <p>7.2. You represent and warrant that:</p>
                            <p>(A) you are competent to contract i.e. (i) if you are an individual, that you are over eighteen
                                years of age, or (ii) that if you are registering on behalf of an entity, that you are authorized
                                to enter into, and bind the entity to, these Terms and register for the Services, in accordance
                                with the laws of India; and </p>
                            <p>(B) your name is not included in any Sanctions Lists; and </p>
                            <p>(C) your membership has not been suspended or terminated by us for any reason whatsoever. If we
                                change the eligibility criteria to be registered with TradeKIA and you no longer comply with
                                the new eligibility criteria, as determined by us in our sole discretion, you accept that we may
                                close your Account without any liability for us. You are solely responsible for ensuring that you
                                are in compliance with these Terms and with all laws, rules, and regulations applicable to you. If
                                your right to access the Services is revoked or use of the Services is in any way prohibited,
                                in such circumstances, you agree not to use or access TradeKIA or use the Services in any way.</p>
                            <p>7.3. We have the right to disable your access to the User Account or any part of it, whether chosen by you or allocated by us, at any time, if in our reasonable opinion you have failed to comply with any of the provisions of these Terms, including without limitation the AML Policy.</p>
                            <p>7.4. If you know or suspect that anyone has unauthorized access to your Account Information or any part of it, you must promptly notify us by sending us an email at support@tradekia.com. We are not liable for any losses or other consequences of unauthorized use of your account.</p>
                        </li>







                        <li>
                            <span>8. YOUR WALLETS</span>
                            <p>
                                8.1. Upon activation of your User Account, we will provide you with a Fiat Wallet and a Coin Wallet.
                                These Wallets enable you to purchase, send, receive or store Digital Assets supported by TradeKIA.
                                You are required to maintain a minimum balance of Funds in your Wallets before you initiate an order
                                and/or transaction. We reserve the right to refuse to execute any order and/or transaction initiated
                                by you if they are in contravention of the AML Policy or to comply with directions of appropriate
                                enforcement authorities.
                            </p>
                            <p>
                                8.2. Terms of Fiat Wallet
                            </p>
                            <p>
                                8.2.1. A Fiat Wallet has been provided to store your fiat holdings. Funds held herein can only be used to purchase Digital Assets through TradeKIA, and the fiat currency denominated sale proceeds of any Digital Assets will be credited into this Fiat Wallet, less the applicable Transaction Fee. You are not entitled to any interest on the Funds held in the Fiat Wallet.
                            </p>
                            <p>
                                8.2.2. In case you wish to acquire Digital Assets using fiat currency you will be required to transfer Funds from your Linked Bank Account to your Fiat Wallet to purchase any Digital Assets. Your Fiat Wallet will reflect funds transferred to it within 3 working days of such transfer being initiated, subject to any delays in the relevant banking channels.
                            </p>
                            <p>
                                8.2.3. You may withdraw the Funds held in your Fiat Wallet, by making a formal request to transfer such Funds into the Linked Bank Account, through us at any time (“Withdrawal Request”). The Company will endeavor to settle each Withdrawal Request within 3 working days of such request being made, subject to any delays in the relevant banking channels.
                            </p>
                            <p>
                                8.3. Terms of Coin Wallet
                            </p>

                            <p>
                                8.3.1. A Coin Wallet has been provided to you wherein Digital Assets may be stored. Funds held in this Wallet may be used to purchase another Digital Asset, and any sale proceeds obtained in the form of Digital Assets will be credited only into this Wallet. You are not entitled to any interest on the Funds held herein.

                            </p>

                            <p>
                                8.3.2. You are permitted to withdraw Funds held in this account, provided such Funds can only be transferred to another digital asset wallet (“External Wallet”). You may be required to verify that you own and operate the External Wallet before your withdrawal request is accepted.

                            </p>

                            <p>
                                8.3.3. In case you transfer any Funds to a recipient who is not a User of our online platforms, we will invite such recipient to open a User Account, and transfer the Funds back to your Coin Wallet in case of such recipient’s failure to open a User Account within 30 days.

                            </p>

                            <p>
                                8.3.4. You are not permitted to transfer, store or receive any digital assets not supported by our platform. You acknowledge that the Company shall not be liable for any losses suffered by you in connection with your attempt to transfer, store or receive digital assets in contravention of this Clause.

                            </p>

                        </li>

                        <li>
                            <span>9. USER REPRESENTATIONS, COVENANTS, AND OBLIGATIONS</span>
                            <span>
                                These Terms govern your behavior on TradeKIA and set forth your obligations. You agree, confirm, and represent the following:
                            </span>
                            <p>
                                ● You shall comply with all the obligations set forth in these Terms, including without limitation of the AML Policy. Pursuant to the economic sanctions programs administered or enforced by any country or government or international authority, including the US Department of the Treasury’s Office of Foreign Assets Control, the US Department of State, and the United Nations Security Council.
                                We are prohibited from providing services or entering into relationships with certain individuals and institutions. In the event that we are required to block funds or Digital Assets associated with your User Account or Linked Bank Account in accordance with a sanctions program, or other similar government sanctions programs, we may: (i) suspend your User Account or Linked Bank Account; (ii) terminate your User Account or Linked Bank Account; (iii) return funds or Digital Assets to the destination of their origin or to an account specified by authorities; or (iv) require you withdraw funds or Digital Assets from your User Account or Linked Bank Account within a certain period of time. We are not responsible for any losses, whether direct or indirect, that you may incur as a result of our complying with Applicable Laws, the guidance or direction of any regulatory authority or government agency, or any writ of attachment, lien, levy, subpoena, warrant, or other legal order.
                            </p>
                            <p>
                                ● You will use the Services rendered by us for lawful purposes only and comply with these Terms and all applicable laws, statutes, by-laws, acts of legislature or parliament, rules, regulations, orders, ordinances, protocols, codes, guidelines, or policies of any governmental authority, including without limitation of the Corruption.
                            </p>
                            <p>
                                ● Creation and maintenance of all Content in your Account shall be your sole responsibility.
                            </p>
                            <p>
                                ● You are responsible for safeguarding the password that you use as a part of your Account Information to access the Services and for any activities or actions under your Account. We encourage you to use “strong” passwords preferably using a combination of upper- and lower-case letters, numbers, and symbols with your Account. The Company will not be liable for any loss or damage arising from your failure to comply with this instruction. You acknowledge that you will irreversibly lose your Digital Assets if you delete your Account.
                            </p>
                            <p>
                                ● You shall provide us with only such information (including without limitation Identification Documents submitted by you) that is true and accurate to the best of your knowledge.
                            </p>
                            <p>
                                ● You shall not cancel any orders initiated but not executed on the exchange. In case any order is partially executed, we may in our sole discretion permit the cancellation of the unexecuted order. You acknowledge that all orders and/or transactions are irreversible once executed.
                            </p>
                            <p>
                                ● You must maintain sufficient Funds in your Wallets before initiating any order and/or transaction. In case you have insufficient funds in your Wallet then the Company may either cancel your order or execute a partial transaction using the Funds available in your Wallet.
                            </p>
                            <p>
                                ● You understand that certain taxes may be applicable upon the trading of Digital Assets and you would be required to determine your tax liability under the Applicable Laws. You acknowledge that you’re solely responsible for payment of any taxes that may arise in connection with your use of Services.
                            </p>
                            <p>
                                ● As the price of Digital Assets is very volatile and subject to fluctuation, you acknowledge that the actual market rate at which order and/or transaction is executed may vary.
                            </p>
                            <p>
                                ● The Company may be required to suspend trading in cases of a force majeure event. You acknowledge that: (i) your access to the Services and/or the Funds during such periods may be limited or restricted; and (ii) the market conditions may differ significantly, following the completion of such Force Majeure Events.
                            </p>
                            <p>
                                ● We do not control the underlying technology which governs the mining, creation, or sale of any Digital Assets. You acknowledge the Company does not exercise any control over the market price or circulation or volatility of the Digital Assets and that the contract for the sale of any of the Digital Assets shall be a strictly bipartite contract between the seller and the buyer.
                            </p>
                            <p>
                                ● It is illegal in India and all relevant jurisdictions (save where the proper licenses are obtained) to require a person to pay money, give something of value, or expend significant effort (in legal terms, "consideration") to enter or participate in an activity or promotion in which he or she may win a prize if there is a significant degree of chance involved (e.g., a random drawing to determine winners) ("Illegal Gambling").
                                Accordingly, we have an internal gambling policy that prohibits the use of TradeKIA for storing, sending, or receiving wagers or its illegal proceeding. It is derived from trading contracts for differences and spread bets on licensed and regulated platforms that do not constitute Illegal Gambling or a violation of its policy. We employ a number of methods to detect violations of our gambling Policy. You agree and understand that we have the right to immediately (i) suspend your User Account and any related User Account, (ii) freeze/lock the funds and Digital Assets in all such User Accounts, and (iii) suspend your access to TradeKIA, if we suspect, in our sole discretion, any such User Account to be in violation of this policy, which is a direct violation of these Terms. We have the right to terminate any such User Accounts and take any and all necessary and appropriate actions pursuant to these Terms and/or Applicable Laws.
                            </p>
                        </li>


                        <li>
                            <span>10. RISKS</span>
                            <p>
                                10.1. A considerable loss may be sustained/incurred while trading in Digital Assets, hence you are advised to determine your financial circumstances and risk tolerance before trading and carefully consider the following risks:
                            </p>
                            <p>
                                10.1.1 Digital Assets are currently unregulated and trading, holding, and transferring some or all Digital Assets may be deemed illegal in India in the future. You are encouraged to obtain appropriate legal counsel regarding the same before using our services.
                            </p>
                            <p>
                                10.1.2 The value of any Digital Asset is very volatile and you may sustain a total loss of your Funds; Due to the market being in a nascent stage, during a market disruption or during a force majeure event, you may face difficulties or impossibility in liquidating your position under certain market conditions.
                            </p>
                            <p>
                                10.1.3 Digital Assets are not backed by a central bank or any other financial regulator and as such, there is no third party that may take any corrective action upon the occurrence of a global/regional crisis;
                            </p>
                            <p>
                                10.1.4 Since Digital Assets are held online, they are susceptible to security breaches and government crackdowns that may end up compromising the integrity or anonymity of the system that produces such Digital Assets;
                            </p>
                            <p>
                                10.2. You acknowledge that the aforementioned is a non-exhaustive statement of risks associated with the trade of Digital Assets and that there may be additional risks not listed or foreseen by the Company.
                            </p>
                            <p>
                                10.3. By creating a User Account, you acknowledge that you have carefully assessed your financial standing and risk tolerance and you confirm that the same is suitable for trading in Digital Assets.
                            </p>
                        </li>

                        <li>
                            <span>11. FEES</span>
                            <p>
                                11.1. Creation of an Account on TradeaKIA and its usage is free.
                            </p>
                            <p>
                                11.2. Trading on the Online Platform is subject to payment of a fee on each transaction executed (“Transaction Fee”). The Transaction Fee chargeable on each trade shall be as provided in the Fee Schedule.
                            </p>
                            <p>
                                11.3. Deposit of Digital Assets in the Coin Wallet is free of charge. Deposit of fiat currency in the Fiat Wallet through credit card, debit card, or net banking will be subject to a transaction fee of 2%. The fee applicable on withdrawal of Digital Assets or fiat currency shall be as provided in the Fee Schedule. Deposits and withdrawals on Digital Assets or fiat currency will be subject to withdrawal limits provided in the Fee Schedule.
                            </p>
                        </li>

                        <li>
                            <span>12. INTELLECTUAL PROPERTY RIGHTS</span>
                            <p>
                                12.1. Unless otherwise specified, all Content on TradeKIA is property of the Company and is protected under copyright, trademark, and other applicable laws.
                            </p>
                            <p>
                                12.2. The trademarks, service marks, and logos of the Company and others used on TradeKIA (“Trademarks”) are the property of the Company and their respective owner
                            </p>
                            <p>
                                12.3. Users shall not reverse engineer or disassemble any part for any reason whatsoever. Any such action shall amount to a material breach of the Terms and may result in the Company terminating the defaulting Users’ User Account
                            </p>
                            <p>
                                12.4. We may in places include third-party intellectual property including the software used for creating or distributing Digital Assets. The Company does not own any rights to such third-party IP and is bound by the license terms for such IP and by virtue of these terms, the Users shall also be bound by the said license terms.
                            </p>
                        </li>

                        <li>
                            <span>13. NO RELIANCE ON INFORMATION</span>
                            <p>
                                13.1. The Content on TradeKIA is provided for general information only. It is not intended to amount to investment advice on which you should rely. You must obtain specialist advice before taking, or refraining from, any action on the basis of the content provided on the Online Platforms. All trades on the Online Platforms are executed automatically, based on the parameters of your order or instructions and in accordance with our trade execution procedures, and you are solely responsible for determining whether any investment, investment strategy or related transaction is appropriate for you based on your personal investment objectives, financial circumstances and risk tolerance.
                                Notwithstanding anything in these Terms, you agree and understand that we accept no responsibility whatsoever for, and shall in no circumstances be liable to you in connection with, your decisions relating to the Online Platforms. You agree and understand that under no circumstances will the operation of TradeKIA and your use of our services be deemed to create a relationship that includes the provision of or tendering of investment advice.
                            </p>
                            <p>
                                13.2. We display some content that is not ours. This content is the sole responsibility of the person/entity who makes it available. The content of the online platform, including without limitation, text, copy, audio, video, photographs, illustrations, graphics, and other visuals, is for informational purposes only and does not constitute professional investment advice, tips, or recommendations of any kind. For the avoidance of doubt, it is clarified that the Company does not provide investment and financial advice to its Users. Reliance on any information appearing on TradeKIA, whether provided by the Company, its content providers, visitors, or others, is solely at your own risk, and the Company shall not bear any liability for any loss/ injury that may arise due to your reliance on any information published on our platform. You further acknowledge and agree that should any claim/ damage/ liability arise as a result of any reliance placed by you on any information published, the Company shall have no liability in relation to the same. We may review content to determine whether it is illegal or violates our policies, and we may remove or refuse to display content that we reasonably believe violates our policies or the law. But that does not necessarily mean that we review content, so please don’t assume that we do.
                            </p>
                            <p>
                                13.3. We assume no responsibility for the content of websites linked on the Online Platforms. Such links should not be interpreted as endorsements by us of those linked websites. We will not be liable for any loss or damage that may arise from your use of them.
                            </p>
                            <p>
                                13.4. Although we make reasonable efforts to update the information, we make no representations, warranties, or guarantees, whether expressed or implied, that the Content is accurate, complete, or up-to-date.
                            </p>
                        </li>

                        <li>
                            <span>14. DISCLAIMER OF WARRANTIES</span>
                            <p>
                                14.1. You expressly acknowledge and agree that the use of the Services and TradeKIA is at your sole risk. The Services are provided on an "as is" and "as available" basis. Although we make our best efforts to provide high-quality Services to all our users, to the fullest extent allowed by law, we expressly disclaim and waive all warranties and conditions of any kind, whether express or implied, including, but not limited to the warranties of merchantability, fitness for a particular purpose or title. The contents of the Services may contain bugs, errors, problems, or other limitations. We assume no liability or responsibility for any errors or omissions in the Content.
                            </p>
                            <p>
                                14.2. We are not responsible for the Content uploaded by you on TradKIA. We are not responsible for any direct or indirect damages or losses caused to you, including without limitation, lost profits, business interruption, or other losses resulting from the use of or reliance in any way on anything available on our platform. It is solely your responsibility to evaluate the accuracy, reliability, completeness, and usefulness of Content available that is used by you.
                            </p>
                            <p>
                                14.3. We make no warranty that the Services will meet your requirements or that the Services or your access to TradeKIA will be uninterrupted, timely, accurate, or reliable; nor do we make any warranty as to the permanent availability of any information and/or that may be stored or transferred through the Services. In case there is any defect in any software being used for the provision of the Services, we do not make any warranty that defects in such software will be corrected. You understand and agree that any material and/or data downloaded or otherwise obtained through the use of the Services is done at your own discretion and risk and you will be solely responsible for any damage to your computer system or loss of data that results from the download of such material or data. In case you store or transfer any information and/or data through us, you are strongly advised to make backup duplicate copies and are solely responsible for any loss.
                            </p>
                            <p>
                                14.4. No advice or information, whether oral or written, obtained by you from TradeKIA shall create any warranty not expressly made herein.
                            </p>
                        </li>

                        <li>
                            <span>15. VIRUSES</span>
                            <p>
                                15.1. You will be responsible for the introduction of any viruses, trojans, worms, logic bombs, or other material which is malicious or technologically harmful. You must not attempt to gain unauthorized access to the server on which information is stored or any server, computer, or database connected to TradeKIA. By breaching this provision, you would commit a criminal offense under the IT Act. We will report any such breach to the relevant law enforcement authorities and we will cooperate with those authorities by disclosing your identity to them. In the event of such a breach, your right to use TradeKIA will cease immediately.
                            </p>
                            <p>
                                15.2. We will not be liable for any loss or damage caused by a virus, denial-of-service attack, distributed denial-of-service attack, or other technologically harmful material that may infect your computer equipment, computer programs, data, or other proprietary material due to your use our services or your downloading of any Content on it, or on any website linked to it.
                            </p>
                            <p>
                                15.3. You should use your own virus protection software. We cannot and do not guarantee or warrant that files available for downloading from TradeKIA will be free of infection by viruses, worms, trojan horses, or other code that manifest contaminating or destructive properties.
                            </p>
                        </li>

                        <li>
                            <span>16. LIMITATION OF OUR LIABILITY</span>
                            <p>
                                16.1. To the extent permitted by law, we exclude all conditions, warranties, representations, or other terms which may apply to TradeKIA or any Content on it including any information itself or Services, whether express or implied.
                            </p>
                            <p>
                                16.2. Our aggregate liability to any user in no event shall exceed the fees paid by the such user during the 6 (six) months immediately preceding the date of the claim for any direct, indirect, or consequential loss or damage, whether in contract, tort (including negligence), breach of statutory duty, or otherwise, even if foreseeable, including those arising under or in connection with:
                                use of, or inability to use, the Services or the delays in transmission or operation of our platform; or use of or reliance on any Content and/or information displayed on the TradeKIA; or from errors, mistakes, omissions, or deletion of files; or use of the Services provided through TradeKIA; whether or not resulting from any communication failure, theft, unauthorized access or a force majeure event.
                            </p>
                            <p>
                                16.3. If you are a business user, please note that in particular, we will not be liable for: loss of profits, sales, business, business opportunity or revenue; business interruption; loss of anticipated savings; loss of business opportunity, goodwill, or reputation
                            </p>
                            <p>
                                16.4. Please note that all Services provided through TradeKIA are only for domestic and private use. You agree not to use our platform for any commercial or business purposes without obtaining a legally valid license to do so in accordance with these Terms.
                            </p>
                        </li>

                        <li>
                            <span>17. ELECTRONIC COMMUNICATIONS</span>
                            <p>
                                17.1. When you visit TradeKIA or send emails to us, you are communicating with us electronically. You consent to receive communications from us electronically. We will communicate with you by e-mail or by posting notices. You agree that all agreements, notices, disclosures, and other communications that we provide to you electronically satisfy any legal requirement that such communications be in writing. You agree that in case there are any changes in any information provided by you to us, including your e-mail address and other contact details, you will be solely responsible to update them regularly. If we send any communication by e-mail, it shall be sent to your e-mail address available on the records created by you on our platform and it shall be deemed to have been received by you once it is reflected as sent in the outbox of our e-mail id. You may opt-out of receiving any electronic communications from us at any time by sending us an email at support@tradekia.com.
                            </p>
                            <p>
                                17.2. You acknowledge that by sending any communication or information to you through email, we are not providing you with any ‘investment advice.
                            </p>
                        </li>
                        <li>
                            <span>18. LINKING AND FRAMING</span>
                            <p>
                                18.1. If you choose to authenticate your Account through a third-party service, like Google, you are linking that account to your Account.
                            </p>
                            <p>
                                18.2. You may link to our home page, provided you do so in a way that is fair and legal and does not damage our reputation or take advantage of it.
                            </p>
                            <p>
                                18.3. You must not establish a link in such a way as to suggest any form of association, approval, or endorsement on our part where none exists.
                            </p>
                            <p>
                                18.4. You must not establish a link to TradeKIA on any website that is not owned by you.
                            </p>
                            <p>
                                18.5. Our website must not be framed on any other website, nor may you create a link to any part of our Platform other than the home page.
                            </p>
                            <p>
                                18.6. We reserve the right to withdraw linking permission without notice.
                            </p>
                            <p>
                                18.7. If you wish to make any use of Content on TradeKIA other than that set out above, please send us an email at support@tradekia.com.
                            </p>
                        </li>
                        <li>
                            <span>19. INDEMNIFICATION</span>
                            <p>
                                To the maximum extent permitted by Applicable Law, you shall indemnify and hold harmless the Company, its owners, licensee, affiliates, subsidiaries, group companies (as applicable), and their respective officers, directors, agents, and employees, from any claim or demand, or actions including reasonable lawyer’s fees, made by any third party or penalty imposed due to or arising out or relating to
                                (a) your use of our Services, (b) your breach of these Terms, or (c) your violation of any law, rules, or regulations or the rights (including infringement of intellectual property rights) of a third party.
                            </p>
                        </li>
                        <li>
                            <span>20. RELEASE AND WAIVER</span>
                            <p>
                                20.1. To the maximum extent permitted by Applicable Law, you hereby release and waive all claims against the Company, and its subsidiaries, affiliates, officers, agents, licensors, co-branders or other partners, and employees from any and all liability for claims, damages (actual and/or consequential), costs and expenses (including litigation costs and attorney's fees) of every kind and nature, arising from or in any way related to your use TradeKIA, its services, content or use of the Digital Assets. You understand that any fact relating to any matter covered by this release may be found to be other than now believed to be true and you accept and assume the risk of such possible differences in fact. In addition, you expressly waive and relinquish any and all rights and benefits which you may have under any other national, state, or federal statute or common law principle of similar effect, to the fullest extent permitted by law.
                            </p>
                            <p>
                                20.2. If we fail to insist that you perform any of your obligations under these Terms, if we do not enforce our rights against you, or if we delay in doing so, that will not mean that we have waived our rights against you and will not mean that you do not have to comply with those obligations. If we waive a default by you, we will only do so in writing, and that will not mean that we will automatically waive any later default by you.
                            </p>
                        </li>
                        <li>
                            <span>21. RIGHT OF SET OFF</span>
                            <p>
                                21.1. You acknowledge and agree that we have the right to set off negative balances in your User Account or Coin Wallet by buying the necessary amount of Digital Assets at the prevailing market price to set off such negative balances with any of the other Digital Assets in your User Account or Coin Wallet; and (iii) any and all debts owed to TradeKIA through the setting off of balances of your User Account or Coin Wallet.

                            </p>
                        </li>
                        <li>
                            <span>22. APPLICABLE LAW</span>
                            <p>
                                22.1. Please note that these Terms, their subject matter, and their formation, are governed by the laws of India. Please refer to our Dispute Resolution Guidelines for more details.
                            </p>
                        </li>
                        <li>
                            <span>23. TERMINATION</span>
                            <p>
                                23.1. We reserve the right to refuse to continue providing you with access to our platform if we discover that you are (a) incompetent to contract by virtue of your age or otherwise under these Terms or the Applicable Law and/or (b) in breach of the Terms. Our services are not available to persons whose name is included in any Sanctions Lists or whose membership has been suspended or terminated by us for any reason whatsoever.
                            </p>
                        </li>
                        <li>
                            <span>24. GENERAL TERMS</span>
                            <p>
                                24.1. Relationship of the Parties: Notwithstanding any provision hereof, for All purposes including without limitation execution of any order and/or transaction initiated by you through TradeKIA, you and the other party shall act independently and not as a partner, joint venturer, agent, intermediary, broker or in any other fiduciary capacity. You shall not have any authority to assume or create any obligation for or on behalf of the Company, express or implied, and you shall not attempt to bind us to any contract.
                            </p>
                            <p>
                                24.2. Invalidity of Specific Terms: If any provision of the Terms is found by a court of competent jurisdiction to be invalid, other provisions of such the Terms shall remain in full force and effect.
                            </p>
                            <p>
                                24.3. Entire Agreement: These Terms, the Privacy Policy, the AML Policy, and Fees Schedules incorporated by reference herein comprise the entire understanding and agreement between you and our platform as to the subject matter hereof, and supersedes any and all prior discussions, agreements and understandings of any kind (including without limitation any prior versions of these Terms), and every nature between/among you and TradeKIA. Section headings in these Terms are for convenience only, and shall not govern the meaning or interpretation of any provision of these Terms.
                            </p>
                            <p>
                                24.4. Third Parties: A person who is not a party under these Terms has no right under the Contracts (Rights of Third Parties) Act, India to enforce or to enjoy the benefit of any term of these Terms.
                            </p>
                        </li>

                        <li>
                            <span>25. CONTACT US</span>
                            <p>
                                25.1. For general inquiries, complaints, and/or giving any feedback, please email support@tradekia.com.
                            </p>
                            <p>
                                25.2. In case you do not want to continue using our Services and want to deactivate your Account with us, please contact us at support@tradekia.com.
                            </p>
                            <p>
                                25.3. If you do not agree with any provision of these Terms and wish to opt-out of such provision, please write to us at support@tradekia.com (“Opt-out Request”).
                            </p>
                        </li>
                    </ul>

                </div>
               
            </div>
            <Footer />
        </>
    )


}

export default TermsConditions;