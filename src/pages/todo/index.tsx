import { useState, useEffect } from 'react'
import { Input, Button, Checkbox, message } from 'antd'
import type { InputProps, CheckboxProps } from 'antd'
import {
    CloseOutlined
  } from '@ant-design/icons';
import styles from './index.less';

interface ListItem {
	text: string,
	id: string
}

function generateRandomId() {
  return Math.random().toString(36).substring(2, 15);
}

export default function Todo() {
	const [text, setText] = useState<string>('')
  const [count, setCount] = useState<number>(0)
	const [list, setList] = useState<ListItem[]>([])
	const [finishList, setFinishList] = useState<string[]>([])

	useEffect(() => {
		setCount(list.length)
	}, [list])
	const onPressEnter:InputProps['onPressEnter'] = ({ target }) => {
		const { value }: any = target
		if (value) {
			setList([...list, { text: value, id: generateRandomId() }])
			setText('')
		} else{ 
			message.warning('请输入内容')
		}
	}
	const clearItem = (item: ListItem, idx: number) => {
		const newList = list.filter((o: ListItem, idx: number) => item.id !== o.id)
		setList(newList)
	}
	const onChange = ({ target }: any, item: ListItem) => {
		if (target.checked) {
			setFinishList([...finishList, item.id])
		} else {
			const newList = finishList.filter((id: string, idx: number) => item.id !== id)
			setFinishList(newList)
		}
	}
	const AllActiveCompleted = () => {
		const finished = list.map((item: ListItem) => item.id)
		setFinishList(finished)
	}
	const clearCompleted =() => {
		const newList = list.filter((item: ListItem) => !finishList.includes(item.id))
		setList(newList)
	}

  return (
    <div className={styles.todo}>
        <h3 className={styles.title}>Todo</h3>
        <Input 
					value={text}
					size="large" 
					placeholder='Create a new todo...' 
					prefix={<span className={styles.icon}></span>}
					onChange={e => setText(e.target.value)}
					onPressEnter={onPressEnter}
				/>
				{
					list.length ? 
					<div className={styles.listWrap}>
							<ul className={styles.content}>
								{
									list.map((item: ListItem, idx: number) => (
										<li key={item.id}>
												<Checkbox checked={finishList.includes(item.id)} onChange={e => onChange(e, item)}></Checkbox>
												<span className={`${styles.text} ${finishList.includes(item.id) ? styles.finished : ''}`}>{item.text}</span>
												<CloseOutlined className={styles.clear} onClick={() => clearItem(item, idx)} />
										</li>
									))
								}
									
							</ul>
							<div className={styles.listBottom}>
									<span>{count} items left</span>
									<Button type="text" onClick={AllActiveCompleted}>All Active Completed</Button>
									<Button type="text" onClick={clearCompleted}>Clear Completed</Button>
							</div>
					</div>
					: null }
    </div>
  );
}
