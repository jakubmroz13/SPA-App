import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AppCtx } from '../App';
import SearchIcon from '@mui/icons-material/Search';
import Button from '@mui/material/Button';
import { Input } from '@mui/material';

function Filtering() {
    const { appCtx, setAppCtx } = useContext(AppCtx)!;
    const [inputID, setInputID] = useState(appCtx.id);

    const navigate = useNavigate();

    function handleSearch() {
        setAppCtx((prev) => {
            return {
                ...prev,
                id: inputID,
                page: 1,
            };
        });
        navigate(`../${inputID}-${appCtx.per_page}-${appCtx.page}`, { replace: true });
    }

    return (
        <div className="Filtering">
            <label htmlFor="input-id">
                <p>ID number:</p>
                <Input
                    data-testid="input-id"
                    id="input-id"
                    value={inputID === 0 ? '' : inputID}
                    onChange={(e) => setInputID(Number(e.target.value))}
                    onKeyPress={(e) => {
                        if (!/[0-9]/.test(e.key)) {
                            e.preventDefault();
                        }
                    }}
                    style={{
                        width: '10em',
                        marginRight: '10px',
                    }}
                />
                <Button
                    data-testid="search-btn"
                    onClick={handleSearch} variant="contained">
                    <SearchIcon />
                </Button>
            </label>

        </div>
    );
}

export default Filtering;
