import { NavDropdown } from "react-bootstrap";
import { useTranslation } from "react-i18next";


const Language = (props) => {
    const { t, i18n } = useTranslation();
    const handleChangeLanguage = (language) => {
        i18n.changeLanguage(language)
    }
    return (
        <>
            <NavDropdown style={{ minWidth: '90px', textAlign: 'center' }}
                title={t('lang_name')} id="basic-nav-dropdown" className='languages'>
                <NavDropdown.Item onClick={() => handleChangeLanguage('en')}>English</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={() => handleChangeLanguage('vi')}>Tiếng Việt</NavDropdown.Item>
            </NavDropdown>
        </>

    )
}
export default Language;