import React from 'react'
import styled from 'styled-components';

const ListingInfoContainer = styled.div`
    border-left: solid #bbbbbb 1px;
    background: #efefef;
    max-width: 300px;
    max-height: 400px;
    overflow-y: auto;
    padding: 10px;
    line-height: 1.6em;
`;

const ListingInfoSection = styled.section`
    line-height: 1.6em;
    font-size: .8em;
    font-weight: bold;
`;

const ListingInfoUL = styled.ul`
    list-style: none;
    list-style-position:inside;
    margin: 0;
    padding: 0;
    line-height: 1.6em;
    font-size: .8em;
`;

const ListingInfoLI = styled.li`
    list-style: none;
    list-style-position:inside;
    margin:0;
    padding:0
`;


type ListingInfoProps = {
    listing: Listing;
}

export const ListingInfo: React.FC<ListingInfoProps> = ({listing}) => {
    const {
        date,
        _id,
        location: { city, state, zip },
        listingUrl,
        price,
        additionalInfo,
        title,
      } = listing;
    return (
        <ListingInfoContainer>
            <ListingInfoSection>
                <div>{`Sold on ${date}`}</div>
                <div>{`Location: ${city}, ${state} ${zip}`}</div>
            </ListingInfoSection>
            <div>
                <ListingInfoUL>
                    {additionalInfo.map((info, idx) => {
                        return <ListingInfoLI key={_id+idx}>{info}</ListingInfoLI>
                    })}
                </ListingInfoUL>
            </div>
        </ListingInfoContainer>
    )
}