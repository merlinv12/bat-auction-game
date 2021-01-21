import React from 'react'

type QuizSummaryProps = {
    listings: Listing[]
}

export const QuizSummary: React.FC<QuizSummaryProps> = ({ listings }) => {
    return (
        <div>
            {listings.map(listing => <QuizSummaryItem key={listing._id} listing={listing} />)}
        </div>
    )
} 

type QuizSummaryItemProps = {
    listing: Listing
}

const QuizSummaryItem: React.FC<QuizSummaryItemProps> = ({ listing }) => (
    <div>
        <div>{listing.title}</div>
        <div>{listing.price}</div>
        <div><a href={listing.url}>Link to listing</a></div>
    </div>
)