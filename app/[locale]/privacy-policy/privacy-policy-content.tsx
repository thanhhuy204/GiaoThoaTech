'use client'

import { useState, useRef } from 'react'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import './privacy-policy.css'

type Section = { key: string; title: string; content: string }

const SECTIONS_VI: Section[] = [
  {
    key: 'intro',
    title: 'GIỚI THIỆU',
    content: `Việc bảo vệ dữ liệu cá nhân của bạn là rất quan trọng đối với chúng tôi. Chính sách Bảo mật của GiaoThoaTech ("Chính sách Bảo mật") này nêu rõ cách thức chúng tôi quản lý dữ liệu cá nhân mà chúng tôi nắm giữ. GiaoThoaTech Pte. Ltd. (được gọi là "GiaoThoaTech", "chúng tôi", "của chúng tôi") tôn trọng tính bảo mật của dữ liệu cá nhân và quyền riêng tư của cá nhân, đồng thời cam kết tuân thủ Đạo luật Bảo vệ Dữ liệu Cá nhân Singapore (Đạo luật số 26 năm 2012) ("PDPA") và các luật bảo vệ dữ liệu hiện hành khác, bao gồm Quy định Bảo vệ Dữ liệu Chung của Liên minh Châu Âu ("EU") ("GDPR") và GDPR của Vương quốc Anh, khi áp dụng.

Vui lòng đọc Chính sách Bảo mật này để bạn biết và hiểu các mục đích mà chúng tôi thu thập, sử dụng và tiết lộ dữ liệu cá nhân của bạn.`,
  },
  {
    key: 'questions',
    title: 'CÂU HỎI VỀ CHÍNH SÁCH BẢO MẬT NÀY',
    content: `Nếu vào bất kỳ thời điểm nào, bạn có bất kỳ thắc mắc nào về Chính sách Bảo mật này hoặc bất kỳ câu hỏi nào khác liên quan đến cách chúng tôi quản lý, bảo vệ và/hoặc xử lý dữ liệu cá nhân của bạn, vui lòng liên hệ với cán bộ bảo vệ dữ liệu của chúng tôi tại contact@giaothoatech.cloud`,
  },
  {
    key: 'dataCollected',
    title: 'GIAOTHOATECH THU THẬP NHỮNG DỮ LIỆU CÁ NHÂN NÀO VỀ BẠN?',
    content: `Dữ liệu cá nhân là bất kỳ dữ liệu nào, dù đúng hay không, về một cá nhân có thể được nhận dạng từ dữ liệu đó; hoặc từ dữ liệu đó kết hợp với các thông tin khác mà chúng tôi có hoặc có khả năng truy cập. Ví dụ về các dữ liệu cá nhân mà bạn có thể cung cấp cho chúng tôi bao gồm (tùy thuộc vào bản chất tương tác của bạn với chúng tôi):

• Tên của bạn, số định danh quốc gia, số hộ chiếu hoặc số nhận dạng khác, số điện thoại, địa chỉ thư tín, địa chỉ email, hình ảnh khuôn mặt trong ảnh hoặc video, dấu vân tay, vị trí địa lý, địa chỉ IP và bất kỳ thông tin nào khác liên quan đến bạn mà bạn đã cung cấp cho chúng tôi dưới bất kỳ hình thức nào.

• Thông tin về việc bạn sử dụng sản phẩm GiaoThoaTech, ứng dụng di động, API/SDK, trang web và các dịch vụ liên quan, bao gồm cookie, địa chỉ IP, chi tiết tài khoản đăng ký và chi tiết thành viên.

• Thông tin liên quan đến thanh toán của bạn; chẳng hạn như thông tin tài khoản ngân hàng hoặc thẻ tín dụng và lịch sử tín dụng của bạn.`,
  },
  {
    key: 'howCollected',
    title: 'GIAOTHOATECH THU THẬP DỮ LIỆU CÁ NHÂN CỦA BẠN NHƯ THẾ NÀO?',
    content: `Nói chung, chúng tôi thu thập dữ liệu cá nhân của bạn theo các cách sau:

• Khi bạn gửi các biểu mẫu liên quan đến bất kỳ Sản phẩm hoặc Dịch vụ nào của chúng tôi, hoặc liên hệ với chúng tôi.
• Khi bạn đăng ký hoặc sử dụng bất kỳ Dịch vụ nào của chúng tôi trên các trang web, nền tảng và ứng dụng.
• Khi bạn sử dụng hoặc mua Sản phẩm hoặc Dịch vụ của chúng tôi.
• Khi bạn thiết lập bất kỳ tài khoản trực tuyến nào với chúng tôi.
• Khi bạn yêu cầu chúng tôi liên hệ với bạn hoặc phản hồi các chương trình khuyến mãi.
• Khi bạn nộp đơn xin việc.
• Khi chúng tôi nhận được thông tin tham chiếu từ các đối tác kinh doanh và bên thứ ba.
• Khi bạn duyệt trang web của chúng tôi (xem Chính sách Cookie).

Chúng tôi có thể giám sát hoặc ghi âm các cuộc gọi điện thoại và các tương tác với khách hàng nhằm mục đích đảm bảo chất lượng, đào tạo nhân viên, xác minh danh tính và xử lý khiếu nại.

Dữ liệu cá nhân của bạn cũng có thể được thu thập nếu chúng tôi đánh giá rằng điều đó phục vụ lợi ích hợp pháp của chúng tôi, bao gồm bảo vệ an ninh vật lý và an ninh mạng, đảm bảo tính liên tục trong hoạt động kinh doanh.`,
  },
  {
    key: 'purpose',
    title: 'GIAOTHOATECH SỬ DỤNG DỮ LIỆU CÁ NHÂN CỦA BẠN VÀO MỤC ĐÍCH GÌ?',
    content: `Chúng tôi có thể thu thập, sử dụng và/hoặc tiết lộ dữ liệu cá nhân của bạn cho các mục đích sau:

Cung cấp Sản phẩm và Dịch vụ:
• Cung cấp sản phẩm, ứng dụng, API và dịch vụ của chúng tôi.
• Liên lạc với bạn liên quan đến các sản phẩm và dịch vụ.
• Thực hiện nghĩa vụ theo thỏa thuận với bạn.
• Cung cấp dịch vụ khách hàng, bao gồm xử lý các yêu cầu và khiếu nại.

Kiểm tra tuân thủ:
• Thực hiện các nghĩa vụ tuân thủ pháp lý và quy định.
• Xác nhận và xác minh danh tính của bạn.

Truyền thông và tiếp thị (với sự đồng ý của bạn):
• Liên lạc về các chương trình khuyến mãi, sự kiện và tin tức.
• Cung cấp thông tin về sản phẩm và dịch vụ mới.

Bảo mật và tuân thủ pháp luật:
• Bảo mật vật lý tại cơ sở của chúng tôi.
• Phát hiện, điều tra và ngăn chặn gian lận.
• Tuân thủ các nghĩa vụ pháp lý theo luật hiện hành.

Cải thiện Sản phẩm và Dịch vụ:
• Tiến hành nghiên cứu và lập kế hoạch cải tiến.
• Phát triển các trang web, công cụ phần mềm và dịch vụ mới.`,
  },
  {
    key: 'sharing',
    title: 'GIAOTHOATECH CHIA SẺ DỮ LIỆU CÁ NHÂN CỦA BẠN VỚI AI?',
    content: `Để cung cấp Sản phẩm và Dịch vụ cho bạn, chúng tôi có thể phải tiết lộ dữ liệu cá nhân của bạn cho:

• Nhà cung cấp dịch vụ: lưu trữ và phân tích dữ liệu, cung cấp dịch vụ khách hàng, quảng cáo và xử lý thanh toán.
• Đại lý của chúng tôi thực hiện một phần sản phẩm hoặc dịch vụ.
• Các công ty liên kết.
• Nhà cung cấp dịch vụ bên thứ ba khác.

Trong các Giao dịch Tài sản Kinh doanh (mua, bán, sáp nhập...), chúng tôi có thể tiết lộ dữ liệu cá nhân của bạn theo quy định của PDPA.

Chúng tôi có thể tiết lộ dữ liệu cá nhân để đáp ứng yêu cầu của cơ quan thực thi pháp luật hoặc bảo vệ quyền và lợi ích của GiaoThoaTech.

Khi phải chuyển dữ liệu cá nhân ra ngoài Singapore, chúng tôi sẽ đảm bảo bên nhận bị ràng buộc bởi các nghĩa vụ pháp lý tương đương với PDPA.

Chúng tôi sẽ không tiết lộ dữ liệu cá nhân của bạn cho bất kỳ bên thứ ba nào nếu không có sự đồng ý trước của bạn, trừ khi được phép theo các ngoại lệ của PDPA.`,
  },
  {
    key: 'access',
    title: 'YÊU CẦU TRUY CẬP, CHỈNH SỬA VÀ/HOẶC CHUYỂN DỮ LIỆU CÁ NHÂN',
    content: `Bạn có thể yêu cầu truy cập, chỉnh sửa và/hoặc chuyển dữ liệu cá nhân mà chúng tôi đang nắm giữ bất kỳ lúc nào bằng cách gửi yêu cầu đến Cán bộ Bảo vệ Dữ liệu của chúng tôi.

Yêu cầu truy cập: Chúng tôi sẽ cung cấp bản sao dữ liệu cá nhân liên quan trong thời gian hợp lý kể từ khi nhận yêu cầu.

Yêu cầu chỉnh sửa: Chúng tôi sẽ xử lý yêu cầu của bạn trong thời gian sớm nhất có thể, bao gồm gửi dữ liệu đã chỉnh sửa đến các tổ chức liên quan khi cần thiết.

Yêu cầu chuyển dữ liệu: Chúng tôi sẽ nỗ lực thực hiện việc chuyển dữ liệu trong vòng 30 ngày dương lịch. Trường hợp không thể thực hiện đúng hạn, chúng tôi sẽ thông báo cho bạn về thời điểm sớm nhất có thể.

Chúng tôi có thể thu một khoản phí hợp lý cho việc xử lý các yêu cầu này và sẽ thông báo trước cho bạn.

Yêu cầu phản đối: Chúng tôi sẽ xử lý trong thời gian hợp lý và thông báo trước về các ảnh hưởng có thể xảy ra đối với dịch vụ của bạn.`,
  },
  {
    key: 'protection',
    title: 'GIAOTHOATECH BẢO VỆ DỮ LIỆU CÁ NHÂN CỦA BẠN NHƯ THẾ NÀO?',
    content: `Chúng tôi sẽ thực hiện các biện pháp phù hợp để đảm bảo dữ liệu cá nhân của bạn được chính xác, đầy đủ và cập nhật.

Chúng tôi sẽ áp dụng các biện pháp phòng ngừa và bảo vệ cần thiết nhằm đảm bảo dữ liệu cá nhân của bạn được bảo mật đầy đủ theo quy định của pháp luật. Các biện pháp bảo mật sẽ được thiết lập để ngăn chặn mọi hành vi:

• Truy cập, thu thập, sử dụng, tiết lộ trái phép.
• Sao chép, sửa đổi, rò rỉ, mất mát, hư hỏng dữ liệu.

Chúng tôi cũng sẽ nỗ lực để đảm bảo rằng dữ liệu cá nhân sẽ được tiêu hủy và/hoặc ẩn danh khi:

• Mục đích thu thập dữ liệu không còn được đáp ứng.
• Việc lưu trữ không còn cần thiết cho bất kỳ mục đích pháp lý hoặc kinh doanh nào khác.`,
  },
  {
    key: 'eea',
    title: 'CÁ NHÂN CƯ TRÚ TẠI KHU VỰC KINH TẾ CHÂU ÂU ("EEA") VÀ VƯƠNG QUỐC ANH',
    content: `Nếu bạn cư trú tại EEA hoặc Vương quốc Anh, các quy định bổ sung theo GDPR cũng sẽ áp dụng đối với dữ liệu cá nhân của bạn.

Cơ sở pháp lý xử lý: Chúng tôi chỉ xử lý dữ liệu khi có cơ sở hợp pháp (hợp đồng, nghĩa vụ pháp lý, lợi ích hợp pháp hoặc sự đồng ý của bạn).

Chuyển dữ liệu quốc tế: Khi chuyển dữ liệu ra ngoài EEA, chúng tôi áp dụng các biện pháp bảo vệ phù hợp như Standard Contractual Clauses (Điều khoản Hợp đồng Tiêu chuẩn).

Quyền của bạn theo GDPR bao gồm: quyền truy cập, chỉnh sửa, xóa, hạn chế xử lý, di chuyển dữ liệu và phản đối xử lý dữ liệu.

Khiếu nại: Bạn có quyền khiếu nại với cơ quan bảo vệ dữ liệu tại quốc gia cư trú của bạn.`,
  },
  {
    key: 'updates',
    title: 'CẬP NHẬT CHÍNH SÁCH BẢO MẬT NÀY',
    content: `Nhằm đảm bảo việc quản lý, bảo vệ và xử lý dữ liệu cá nhân của bạn được thực hiện đúng đắn, chúng tôi sẽ định kỳ rà soát các chính sách, thủ tục và quy trình của mình.

Chúng tôi có toàn quyền sửa đổi các điều khoản của Chính sách Bảo mật này. Mọi phiên bản sửa đổi sẽ được đăng tải trên trang web của chúng tôi.

Chúng tôi sẽ thông báo cho bạn nếu có bất kỳ thay đổi quan trọng nào khi pháp luật hiện hành yêu cầu.

Phiên bản hiện tại có hiệu lực từ ngày 22 tháng 3 năm 2025.`,
  },
]

const SECTIONS_EN: Section[] = [
  {
    key: 'intro',
    title: 'INTRODUCTION',
    content: `Protection of your personal data is important to us. This GiaoThoaTech Privacy Policy ("Privacy Policy") outlines how we manage the personal data that we hold. GiaoThoaTech Pte. Ltd. (referred to as "GiaoThoaTech", "we", "us", or "our") respects the confidentiality of personal data and privacy of individuals and are committed to complying with the Singapore Personal Data Protection Act (Act 26 of 2012) ("PDPA") and other applicable data protection laws, including the European Union ("EU") General Data Protection Regulation ("GDPR") and UK GDPR, where applicable.

Please read this Privacy Policy so that you know and understand the purposes for which we collect, use and disclose your personal data.`,
  },
  {
    key: 'questions',
    title: 'QUESTIONS ABOUT THIS PRIVACY POLICY',
    content: `If, at any time, you have any queries on this Privacy Policy or any other queries in relation to how we manage, protect and/or process your personal data, please do not hesitate to contact our data protection officer at contact@giaothoatech.cloud`,
  },
  {
    key: 'dataCollected',
    title: 'WHAT PERSONAL DATA DOES GIAOTHOATECH COLLECT ABOUT YOU?',
    content: `Personal data is any data, whether true or not, about an individual who can be identified from that data; or from that data and other information to which we have or is likely to have access. Examples of such personal data which you may provide us include (depending on the nature of your interaction with us):

• Your name, national identification number, passport number or other identification number, telephone number, mailing address, email address, facial image in a photograph or video recording, fingerprint, geolocation, IP address, and any other information relating to you which you have provided us in any form you may have submitted to us, or in other forms of interaction with you.

• Information about your use of your MobisureHome, MobisureWork, or GiaoThoaTech Product ("Product"), the software application that may be downloadable to your mobile device to operate the Product ("Mobile App"), the MobisureDeveloper API and SDK hosted on GiaoThoaTech's online platform ("API/SDK"), the website located at GiaoThoaTech.co or MobisureHome.co and their sub-domains (each a "Site"), and the services offered by GiaoThoaTech through the Products, Sites, API/SDK and Mobile App (the "Services"), including cookies, IP addresses, subscription account details and membership details.

• Your payment related information; such as your bank account or credit card information, and your credit history.`,
  },
  {
    key: 'howCollected',
    title: 'HOW DOES GIAOTHOATECH COLLECT YOUR PERSONAL DATA?',
    content: `Generally, we collect your personal data in the following ways:

• when you submit forms relating to any of our Products or Services, or otherwise contact us in relation to our Products or Services;
• when you register for or use any of our Services on websites, platforms and apps owned or operated by us;
• when you register for or use any of our Services, including accessing our Products at your or third party's properties;
• when you use or purchase our Products or Services;
• when you establish any online account with us;
• when you request that we contact you;
• when you respond to our request for additional personal data;
• when you ask to be included in an email or other mailing list;
• when you respond to our promotions or other initiatives;
• when you submit a job application;
• when we receive references from business partners and third parties, for example, where you have been referred by them;
• when you submit your personal data to us for any other reason; and
• when you browse our website. Please refer to our Cookie Policy for more information.

We may monitor or record phone calls and customer-facing interactions for quality assurance, employee training and performance evaluation, and identity verification purposes, and while receiving feedback, responding to your queries, requests and complaints and other related purposes. Such monitoring or recording will be done in accordance with the applicable law.

Your personal data may also be collected, used and/or disclosed if we have assessed that to do so would be in our legitimate interests and/or for business improvement purposes. Legitimate interests include protecting against physical and cyber security risks, and ensuring business continuity, and business improvement purposes include improvement or enhancement of any goods or services, or methods or processes for operations and for learning about and understanding customers' behaviour and preferences. Before doing so, we will take steps to ensure that any adverse effects that might arise for you have already been identified and eliminated, reduced or mitigated.

We may receive personal data about you from other sources (for example, when you authorise a third-party service to interact directly with our Products, Mobile App, Sites or Services to provide or receive personalised information about you).`,
  },
  {
    key: 'purpose',
    title: 'WHAT DOES GIAOTHOATECH USE YOUR PERSONAL DATA FOR?',
    content: `We may collect, use and/or disclose your personal data, where permitted by applicable data protection laws, for the following purposes:

Provision of Products, Sites, API/SDK, Mobile App, and Services:
• providing our Products, Sites, API/SDK, Mobile App, or Services;
• providing promotional items upon request;
• communicating with you in relation to those Products, Sites, API/SDK and Mobile Apps, or Services;
• performing our obligations, and protecting, exercising or enforcing our rights under our agreement(s) with you;
• ensuring that our Sites, API/SDK and/or Mobile App are presented in the best manner for you;
• offering you additional products and services provided by us or our third-party partners; and
• for any purpose connected with your agreement(s) with us, including the maintenance of a central database of customers.

Compliance checks:
• fulfilling our regulatory compliance obligations;
• "Know Your Client" checks;
• confirming and verifying your identity;
• use of credit reference agencies; and
• screening against government and/or law enforcement agency sanctions lists and other legal restrictions.

Operating our business:
• administering our business activities;
• operating and managing our Sites, API/SDK and Mobile App, and our Services;
• communicating and interacting with you through our Sites, Mobile App, or our Services;
• notifying you of changes to any of our Products, Sites, API/SDK and Mobile App, or our Services; and
• providing customer service, including handling enquiries and complaints.

Communications and marketing:
• communicating with you through any means about promotions, campaigns, events and news, subject always to obtaining your prior consent where required under applicable law;
• providing you with information about other products and services we offer;
• keeping you informed about industry developments; and
• maintaining and updating your contact information where appropriate.

Security:
• physical security of our premises (including records of visits to our premises);
• CCTV recordings; and electronic security (including login records and access details).

Investigations: detecting, investigating and preventing breaches of policy, and criminal offences, in accordance with applicable law.

Legal proceedings: establishing, exercising and defending legal rights.

Legal compliance: compliance with our legal and regulatory obligations under applicable law.

Improving our Products, Sites, API/SDK, Mobile App, and Services:
• identifying issues with our Products, Sites, API/SDK and Mobile App, or Services;
• conducting research and planning improvements; and creating new websites, software development tools, apps, or services.

Fraud prevention: detecting, preventing and investigating fraud.

The above purposes are not exhaustive and depending on the nature of your relationship with us (for example, if you are a customer or vendor), we may collect, use and disclose your personal data for additional purposes which you will be notified of, in accordance with applicable terms and conditions.`,
  },
  {
    key: 'sharing',
    title: 'WHO DOES GIAOTHOATECH SHARE YOUR PERSONAL DATA WITH?',
    content: `In order for us to offer our Products and Services to you, we may have to disclose your personal data to third parties in order for them to process it on our behalf. This may include the following categories of recipients:

• Our service providers – for example, service providers in charge of storing and analysing data, providing customer service, advertising, and payment processing;
• Our agents – who may be delivering parts of our Products or Services on our behalf;
• Our related companies – who may be delivering parts of our Products or Services on our behalf; and
• Other third-party service providers – whose services or applications we may make available for your use on our Products and/or Services.

As we continue to develop our business, we might sell or buy other businesses or assets which include any Business Asset Transactions. "Business Asset Transaction" means the purchase, sale, lease, merger or amalgamation or any other acquisition, disposal or financing of an organisation or a portion of an organisation or of any of the business or assets of an organisation. In such transactions, we may disclose your personal data to a third party without first obtaining your consent under the PDPA or applicable data protection laws.

We may disclose any of the personal data we collect to respond to subpoenas, court orders, legal process, law enforcement requests, legal claims, or government inquiries, and to protect and defend the rights, interests, safety, and security of GiaoThoaTech, our affiliates, users, or the public. We may also share any of the personal data we collect to enforce any terms applicable to the use of our Products and/or Services, to exercise or defend any legal claims, and comply with any applicable law.

Where we are required to transfer your personal data outside of Singapore, we shall take such steps to ensure that the receiving organisation is bound by legally enforceable obligations such as binding corporate rules (for affiliated organisations) or a contract or written agreement (for unrelated third parties), to provide a standard of protection comparable to the PDPA.

We will only disclose your personal data to third parties where we are allowed to do so under data protection laws. We will not disclose your personal data to any third parties without your prior consent, unless such disclosure is sanctioned under the PDPA exemptions. When sharing your personal data with third parties, we will always ensure that appropriate safeguards are in place to protect the security and confidentiality of your personal data.`,
  },
  {
    key: 'access',
    title: 'REQUESTS FOR ACCESS, CORRECTION AND/OR PORTING OF PERSONAL DATA',
    content: `You may request to access, correct and/or port the personal data currently in our possession, or object to the collection, use and/or disclosure of your personal data in our possession or under our control, at any time by submitting your request to our Data Protection Officer.

For a request to access personal data, we will provide you with a copy of the relevant personal data within a reasonable amount of time from when the request is made.

For a request to correct personal data, we will process your request as soon as practicable after the request has been made. Such correction may involve necessary verification, which may include sending the corrected personal data to other organisations to which the personal data was disclosed by GiaoThoaTech within a year before the date the correction was made (unless that other organisation does not need the corrected personal data for any legal or business purpose), or if you so consent, only to specific organisations.

For a request to port personal data, once we have sufficient information from you to deal with the request, we will seek to port your personal data within 30 calendar days. Where we are unable to do so within the said 30 calendar days, we will notify you of the soonest practicable time within which we can carry out the data porting.

We may also charge a reasonable fee for the handling and processing of your requests to access, correct and/or port your personal data. You will be notified in advance of such costs.

For a request to object to the processing of your personal data by us, we will process your request within a reasonable time from when the request is made. Such requests may adversely impact your relationship with us or the quality of the services and products we deliver to you. We will notify you in advance of such impacts.`,
  },
  {
    key: 'protection',
    title: 'HOW DOES GIAOTHOATECH PROTECT YOUR PERSONAL DATA?',
    content: `We will take appropriate measures to keep your personal data accurate, complete and updated.

We will take precautions and preventive measures to ensure that your personal data is adequately protected and secured in accordance with data protection laws. Appropriate security arrangements will be made to prevent any unauthorised access, collection, use, disclosure, copying, modification, leakage, loss, damage and/or alteration to or of your personal data.

We will also make reasonable efforts to ensure that the personal data in our possession or under our control is destroyed and/or anonymised as soon as it is reasonable to assume that:

• The purpose for which that personal data was collected is no longer being served by the retention of such personal data; and
• Retention is no longer necessary for any other legal or business purposes.`,
  },
  {
    key: 'eea',
    title: 'PERSON LOCATED INSIDE THE EUROPEAN ECONOMIC AREA ("EEA") AND THE UK',
    content: `If you are located inside the EEA or the UK, the provisions set out in Appendix 1 will also apply to your personal data.

These provisions include additional rights under the GDPR such as:
• Legal basis for processing: We only process data when there is a lawful basis (contract, legal obligation, legitimate interests, or your consent).
• International data transfers: When transferring data outside the EEA, we apply appropriate safeguards such as Standard Contractual Clauses.
• Your rights: right to access, rectification, erasure, restriction of processing, data portability, and to object to processing.
• Complaints: You have the right to lodge a complaint with the supervisory authority in your country of residence.`,
  },
  {
    key: 'updates',
    title: 'UPDATES TO THIS PRIVACY POLICY',
    content: `As part of our efforts to ensure that we properly manage, protect and process your personal data, we will be reviewing our policies, procedures and processes from time to time.

We may amend the terms of this Privacy Policy at our absolute discretion. Any amended policy will be posted on our website, and we will notify you if we make any significant changes to this Privacy Policy where required to do so under applicable laws.

The current version is effective from 22 March 2025.`,
  },
]

export default function PrivacyPolicyContent() {
  const locale = useLocale()
  const isVI = locale === 'vi'
  const SECTIONS = isVI ? SECTIONS_VI : SECTIONS_EN

  const [openSections, setOpenSections] = useState<Set<string>>(new Set())
  const sectionRefs = useRef<Record<string, HTMLDivElement | null>>({})

  function toggleSection(key: string) {
    setOpenSections(prev => {
      const next = new Set(prev)
      if (next.has(key)) next.delete(key)
      else next.add(key)
      return next
    })
  }

  const effectiveLabel = isVI ? 'Có hiệu lực từ ngày 22 tháng 3 năm 2025' : 'Effective from 22 March 2025'
  const legalLabel   = isVI ? 'Pháp lý' : 'Legal'
  const pageTitle    = isVI ? 'Chính sách Bảo mật' : 'Privacy Policy'
  const bannerHeading = isVI ? 'Bạn có câu hỏi về quyền riêng tư?' : 'Have questions about your privacy?'
  const bannerSub    = isVI
    ? 'Liên hệ Cán bộ Bảo vệ Dữ liệu của chúng tôi — chúng tôi sẵn sàng hỗ trợ.'
    : 'Contact our Data Protection Officer — we are here to help.'

  return (
    <div className="pp-page">

      {/* ── Hero ── */}
      <section className="pp-hero">
        <div className="pp-hero-inner container">
          <span className="pp-label">{legalLabel}</span>
          <h1 className="pp-title">{pageTitle}</h1>
          <p className="pp-effective">{effectiveLabel}</p>
        </div>
      </section>

      {/* ── Body ── */}
      <div className="pp-body container">

        {/* Accordion */}
        <div className="pp-accordion">
          {SECTIONS.map((s, i) => {
            const isOpen = openSections.has(s.key)
            return (
              <div
                key={s.key}
                id={s.key}
                className={`pp-acc-item${isOpen ? ' open' : ''}`}
                ref={el => { sectionRefs.current[s.key] = el }}
              >
                <button
                  className="pp-acc-header"
                  onClick={() => toggleSection(s.key)}
                  aria-expanded={isOpen}
                >
                  <span className="pp-acc-num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="pp-acc-title">{s.title}</span>
                  <span className={`pp-acc-arrow${isOpen ? ' open' : ''}`}>
                    <svg width="18" height="18" viewBox="0 0 20 20" fill="none">
                      <path d="M5 7.5L10 12.5L15 7.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </span>
                </button>
                <div className="pp-acc-body">
                  <div className="pp-acc-inner">
                    {s.content.split('\n').map((line, idx) =>
                      line.trim() === ''
                        ? <br key={idx} />
                        : <p key={idx} className="pp-acc-p">{line}</p>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* ── Contact Banner ── */}
      <section className="pp-contact-banner">
        <div className="container pp-contact-inner">
          <div className="pp-contact-text">
            <h2 className="pp-contact-heading">{bannerHeading}</h2>
            <p className="pp-contact-sub">{bannerSub}</p>
          </div>
          <a href="mailto:contact@giaothoatech.cloud" className="pp-contact-btn">
            contact@giaothoatech.cloud →
          </a>
        </div>
      </section>
    </div>
  )
}
