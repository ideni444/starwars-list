import PeopleList from '../Components/PeopleList'
import { SearchBox } from '../Components/SearchBox'
import React, { useCallback, useEffect, useState } from 'react'
import styles from '../styles/_containers.module.scss'
import { Pagination } from '../Components/Pagination'
import { MagnifyingGlass } from 'react-loader-spinner'
import { IPerson } from '../types/Person'
import { useDebounce } from '../utils/debounce'
import { useRouter } from 'next/router'

type IProps = {
	people: IPerson[],
	total: string,
	next: string | null,
	prev: string | null
}

export default function Home({ people, total, next, prev }: IProps) {
	const { query } = useRouter()
	const [searchQuery, setSearchQuery] = useState('')
	const [peopleList, setPeopleList] = useState(people)
	const [isLoading, setIsLoading] = useState(false)
	const [totalCount, setTotalCount] = useState(total)
	const [pageLinks, setPageLinks] = useState({ next, prev });

	const fetchData = useCallback(
		async (link: string | null) => {
			if (link) {
				try {
					setIsLoading(true);
					const response = await fetch(link);
					const data = await response.json();
					setPeopleList(data.results);
					setPageLinks({ next: data.next, prev: data.previous });
					setTotalCount(data.count)
				} catch (error) {
					throw new Error(error);
				} finally {
					setIsLoading(false);
				}
			}
		},
		[setIsLoading, setPeopleList]
	)

	const debouncedSearchQuery = useDebounce(searchQuery, 1500);

	useEffect(() => {
		if (debouncedSearchQuery === '') {
			query.page = '1'
		}
		fetchData(`https://swapi.dev/api/people/?search=${debouncedSearchQuery}`);
	}, [debouncedSearchQuery, fetchData]);

	return (
		<>
			{isLoading && (
				<div className={styles.container__loader}>
					<MagnifyingGlass
						visible={true}
						height="120"
						width="120"
						ariaLabel="MagnifyingGlass-loading"
						wrapperClass="MagnifyingGlass-wrapper"
						glassColor='#c0efff'
						color='#e15b64'
					/>
				</div>
			)}
			<main className={[styles.container, isLoading && styles.container_isLoading].join(' ')}>
				<SearchBox value={searchQuery} onChange={setSearchQuery} />
				<PeopleList people={peopleList} query={searchQuery} />
				<Pagination total={totalCount} next={pageLinks.next} prev={pageLinks.prev} setPeopleList={setPeopleList} setIsLoading={setIsLoading} isLoading={isLoading} setPageLinks={setPageLinks} />
			</main>
		</>
	);
}

export async function getServerSideProps(context) {
	const { query } = context;
	try {
		if (typeof query.page !== 'string') {
			query.page = '1'
		}
		const response = await fetch(`https://swapi.dev/api/people/?page=${query.page}`)
		const data = await response.json()

		return {
			props: {
				people: data.results || [],
				total: data.count || 0,
				next: data.next,
				prev: data.previous,
			}
		}
	} catch (e) {
		throw new Error(e)
	}
}
